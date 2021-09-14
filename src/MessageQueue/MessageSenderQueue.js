const BadWordConstants = require('./../BadWordDetector/BadWordConstants');
const MessageQueue = require('./MessageQueue');

class MessageSenderQueue extends MessageQueue {
  constructor() {}

	constructor(size) {
		super();
    this.size = size
	}

	add(message) {
		if (this.queue.length > this.size) {
			this.queue.shift();
		}
		this.queue.push(message.toLowerCase());
	}

  detectSameSender() {
    if (this.queue.length < this.size) {
      
    }
    for (var i = 1; i < this.queue.length; i++) {

    }
  }
}

module.exports = MessageSenderQueue;
