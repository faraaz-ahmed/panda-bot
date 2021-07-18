module.exports = class Picture {
  constructor() {}

  sendAvatar(message) {
    // Send the user's avatar URL
    message.reply("Here's your avatar");
    message.reply(message.author.displayAvatarURL());
  }
};
