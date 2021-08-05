class MessageQueue {
  constructor() {
    this.queue = [];
    this.size = 4;
    this.combinedMessage = '';
  }

  add(message) {
    if (this.queue.length > 4) {
      this.queue.shift();
    }
    this.queue.push(this.removeSpecialCharacters(message));
    this.setCombinedMessage();
  }

  removeSpecialCharacters(message) {
    return message.replace(/[^a-zA-Z0-9]/g, '');
  }

  pop(times = 1) {
    if (this.queue.length > 0) {
      for(let i = 0; i < times; i++) {
        this.queue.pop();
      }
    }
  }

  setCombinedMessage() {
    let message = '';
    this.queue.forEach(messageInQueue => {
      message += messageInQueue;
    });
    this.combinedMessage = message;
  }
  
}

const messageAction = new MessageQueue();
module.exports = messageAction;