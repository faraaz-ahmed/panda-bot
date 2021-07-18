const BadWordConstants = require('./BadWordConstants');

const ResponseMessages = {
  badWord:
    'Usage of bad words is prohibited, please refrain from using such terms.',
  nonAlphaNumeric: 'Please use english alphabets.',
};

module.exports = class BadWordDetector {
  constructor() {}

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
      if (!(code > 31 && code < 128)) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

  actOnBadMessage(message) {
    if (this.detect(message.content)) {
      message.fetch(message.id).then((msg) => msg.delete());
      message
        .reply(ResponseMessages.badWord)
        .then((msg) => {
          msg.delete({ timeout: 6000 /*time unitl delete in milliseconds*/ });
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    } else if (!this.checkIfAlphanumeric(message.content)) {
      message.fetch(message.id).then((msg) => msg.delete());
      message
        .reply(ResponseMessages.nonAlphaNumeric)
        .then((msg) => {
          msg.delete({ timeout: 6000 /*time unitl delete in milliseconds*/ });
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
  }
};
