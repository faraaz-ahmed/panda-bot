class MessageQueue {
  constructor() {
    this.queue = [];
    this.size = 4;
    this.combinedMessage = '';
  }

  add(message) {
    if (this.queue.length < 4) {
      this.queue.push(message);
    } else {
      this.queue.shift();
      this.queue.push(message);
    }
    this.setCombinedMessage();
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