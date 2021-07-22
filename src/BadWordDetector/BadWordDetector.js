const BadWordConstants = require('./BadWordConstants');

const ResponseMessages = {
  badWord:
    'Usage of bad words is prohibited, please refrain from using such terms.',
  nonAlphaNumeric: 'Please use english alphabets.',
  exceededMentionLimit: 'Please don\'t spam or ping multiple people at once.'
};

module.exports = class BadWordDetector {
  constructor() { }

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
        count += 1
      }
    }
    return count > limit;
  }

  timeout(minutes, muteUser, mutedRole) {
    setTimeout(() => {
      muteUser.roles.remove(mutedRole, `Temporary mute expired.`);
    }, minutes * 60000); // time in ms
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
    } else if (this.ifExceedsMentionLimit(message.content, 4)) {
      message.fetch(message.id).then((msg) => msg.delete());
      const muteRole = message.guild.roles.find(r => r.name === 'muted');
      const muteUser = message.author;
      muteUser.roles.add(muteRole);
      message
        .reply(ResponseMessages.exceededMentionLimit)
        .then((msg) => {
          msg.delete({ timeout: 6000 /*time unitl delete in milliseconds*/ });
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      console.log(message.content)
      this.timeout(minutes, muteUser, muteRole);
    }
  }
};
