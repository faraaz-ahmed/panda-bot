class MessageAction {
	constructor() {}

	unmuteAfterTimeout(minutes, muteUser, mutedRole) {
		setTimeout(() => {
			muteUser.roles.remove(mutedRole, `Temporary mute expired.`);
		}, minutes * 60000); // time in ms
	}

	delete(message) {
		message?.fetch(message.id).then((msg) => msg.delete().catch(() => console.log('unable to delete')));
	}

	replyThenDelete(message, response, timeoutTillDelete, messageQueue) {
		message
			.reply(response)
			.then((msg) => {
				msg
					.delete({
						timeout:
							timeoutTillDelete * 1000 /*time unitl delete in milliseconds*/,
					})
					.then(() => console.log('deletion successful'))
					.catch(() => console.log('error in deletion'));
				messageQueue.pop();
			})
			.catch(
				(msg) => {
					console.log(
						`There was an error with the following message "${message.content}"`
					);
				}
				/*Your Error handling if the Message isn't returned, sent, etc.*/
			);
	}

	mute(message, muteRoleName) {
		const muteRole = message?.guild?.roles?.find(
			(r) => r.name === muteRoleName
		);
		const muteUser = message?.author;
		muteUser?.roles?.add(muteRole);
		this.unmuteAfterTimeout(10, muteUser, muteRole);
	}
}

const messageAction = new MessageAction();
module.exports = messageAction;
