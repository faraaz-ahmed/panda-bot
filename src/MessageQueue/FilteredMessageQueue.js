const BadWordConstants = require('./../BadWordDetector/BadWordConstants');
const MessageQueue = require('./MessageQueue');

class FilteredMessageQueue extends MessageQueue {
	constructor() {
    super();
	}

	add(message) {
		if (this.queue.length > 4) {
			this.queue.shift();
		}
		this.queue.push(
			this.filterOutAllowedWords(
				// TODO: decide if to push or not to queue if there are allowed words?
				this.removeSpecialCharacters(message.toLowerCase())
			)
		);
		this.setCombinedMessage();
	}

	removeSpecialCharacters(message) {
		return message.replace(/[^a-zA-Z0-9]/g, '');
	}
}

// const filteredMessageQueue = new FilteredMessageQueue();
// module.exports = filteredMessageQueue;
module.exports = FilteredMessageQueue;
