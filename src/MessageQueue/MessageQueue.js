const BadWordConstants = require('./../BadWordDetector/BadWordConstants');

class MessageQueue {
	constructor() {
		this.queue = [];
		this.size = 4;
		this.combinedMessage = '';
	}

	filterOutAllowedWords(messageString) {
		let filteredMessage = messageString;
		BadWordConstants.allowedWords.forEach((allowedWord) => {
			filteredMessage = filteredMessage.replace(allowedWord, '');
		});
		return filteredMessage;
	}

	add(message) {
		console.log('check queue', this.queue)
		if (this.queue.length > this.size) {
			this.queue.shift();
		}
		this.queue.push(
			this.filterOutAllowedWords(
				// TODO: decide if to push or not to queue if there are allowed words?
				message.toLowerCase()
			)
		);
		this.setCombinedMessage();
	}

	pop(times = 1) {
		if (this.queue.length > 0) {
			for (let i = 0; i < times; i++) {
				this.queue.pop();
			}
		}
		this.setCombinedMessage();
	}

	setCombinedMessage() {
		let message = '';
		this.queue.forEach((messageInQueue) => {
			message += messageInQueue;
		});
		this.combinedMessage = message;
	}
}

module.exports = MessageQueue;
