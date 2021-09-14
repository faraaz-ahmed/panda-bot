const BadWordConstants = require('./BadWordConstants');
const messageAction = require('../MessageAction/MessageAction');

const ResponseMessages = {
	badWord:
		'Usage of bad words is prohibited, please refrain from using such terms.',
	nonAlphaNumeric: 'Please use english alphabets. ',
	exceededMentionLimit: "Please don't spam or ping multiple times at once.",
	link: 'Invite links are not supported'
};

module.exports = class BadWordDetector {
	constructor(messageQueue, filteredMessageQueue) {
		this.messageQueue = messageQueue;
		this.filteredMessageQueue = filteredMessageQueue;
	}

	resolve(word) {
		let resolvedWord = '';
		let i = 0;
		while (i < word.length) {
			const currentChar = word.charAt(i);
			resolvedWord += BadWordConstants.characterReplicas[currentChar]
				? BadWordConstants.characterReplicas[currentChar]
				: currentChar !== ' '
				? currentChar
				: '';
			i++;
		}
		return resolvedWord;
	}

	compress(word) {
		let compressedWord = '';
		let i = 0;
		while (i < word.length) {
			const currentChar = word.charAt(i);
			const previousChar = i !== 0 ? word.charAt(i - 1) : '';
			compressedWord += currentChar !== previousChar ? currentChar : '';
			i++;
		}
		return compressedWord;
	}

	detect(word) {
		return BadWordConstants.badWords.find((badWord) =>
			this.compress(this.resolve(word)).includes(badWord)
		);
	}

	checkIfAlphanumeric(str) {
		var code, i, len;

		for (i = 0, len = str.length; i < len; i++) {
			code = str.charCodeAt(i);
			if (code > 128) {
				// lower alpha (a-z)
				return false;
			}
		}
		return true;
	}

	ifExceedsMentionLimit(str, limit) {
		var code, i, len;
		let count = 0;
		for (i = 0, len = str.length; i < len; i++) {
			code = str.charCodeAt(i);
			if (code === 64) {
				count += 1;
			}
		}
		return count > limit;
	}

	isAnInvite(str) {
		return str.includes('https://discord.gg/');
	}

	unmuteAfterTimeout(minutes, muteUser, mutedRole) {
		setTimeout(() => {
			muteUser.roles.remove(mutedRole, `Temporary mute expired.`);
		}, minutes * 60000); // time in ms
	}

	deleteMessageAndReply(message, response, timeout, messageQueue) {
		messageAction.delete(message);
		return {
			message,
			response,
			timeout,
			messageQueue,
		};
	}

	actOnBadMessage(message) {
		if (message.author.bot) return;
		let responseMessage = '';

		[this.messageQueue, this.filteredMessageQueue].forEach((messageQueue) => {
			messageQueue.add(message.content);
			if (this.detect(messageQueue.combinedMessage)) {
				responseMessage = this.deleteMessageAndReply(
					message,
					ResponseMessages?.badWord,
					6,
					messageQueue
				);
			} else if (!this.checkIfAlphanumeric(messageQueue.combinedMessage)) {
				responseMessage = this.deleteMessageAndReply(
					message,
					ResponseMessages?.nonAlphaNumeric,
					6,
					messageQueue
				);
			} else if (this.isAnInvite(messageQueue.combinedMessage)) {
				responseMessage = this.deleteMessageAndReply(
					message,
					ResponseMessages?.link,
					6,
					messageQueue
				);
			}
		});

		if (responseMessage) {
			console.log('inside')
			messageAction.replyThenDelete(
				responseMessage?.message,
				responseMessage?.response,
				responseMessage?.timeout,
				responseMessage?.messageQueue
			);
		}

		console.log('message queue', this.messageQueue.queue, this.filteredMessageQueue.queue);
		return Boolean(responseMessage);
	}
};
