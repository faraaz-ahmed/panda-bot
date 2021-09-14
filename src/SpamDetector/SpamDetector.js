class SpamDetector {
  constructor() {}
  detectMultipleMentions(message, mentionLimit) {
    let count = 0;
    for (var i = 0; i < message.length; i++) {
      if (message[i] === '@') {
        count++;
      }
      if (count > mentionLimit) {
        return true;
      }
    }
    return false;
  }

  exceedsMessageLimit(message, characterLimit) {
    return message > characterLimit;
  }

  

}