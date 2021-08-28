const BadWordConstants = require('./BadWordConstants');
const messageAction = require('../MessageAction/MessageAction');
const messageQueue = require('../MessageQueue/MessageQueue');
const ROLES = require('../AppConstants/roles');

const ResponseMessages = {
  badWord:
    'Usage of bad words is prohibited, please refrain from using such terms. :panfat:',
  nonAlphaNumeric: 'Please use english alphabets. :panfat:',
  exceededMentionLimit: 'Please don\'t spam or ping multiple times at once. :panfat:'
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

  unmuteAfterTimeout(minutes, muteUser, mutedRole) {
    setTimeout(() => {
      muteUser.roles.remove(mutedRole, `Temporary mute expired.`);
    }, minutes * 60000); // time in ms
  }

  actOnBadMessage(message) {
    // if(message.member.roles.has(ROLES.BOT_ROLE)) return;
    if(message.author.bot) return;
    messageQueue.add(message.content);
    if (this.detect(messageQueue.combinedMessage)) {
      messageAction.delete(message);
      messageAction.replyThenDelete(message, ResponseMessages.badWord, 6, messageQueue);
    } else if (!this.checkIfAlphanumeric(messageQueue.combinedMessage)) {
      messageAction.delete(message);
      messageAction.replyThenDelete(message, ResponseMessages.nonAlphaNumeric, 6, messageQueue);
    }
    console.log('message queue', messageQueue.queue)
    //  else if (this.ifExceedsMentionLimit(messageQueue.combinedMessage, 4)) {
    //   messageAction.mute(message);
    // }
  }
};
