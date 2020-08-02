const Discord = require('discord.js');
const Picture = require('./picture');

const client = new Discord.Client();
const pandaBotToken =
  'NzMxODgxOTAwOTQzMjEyNjY0.XwsgIg.KzxKAwKqRPSWd2d5CZv_BkyAjAA';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content === 'avatar') {
    // message.reply("nigger here's your avatar");
    // message.reply(message.author.displayAvatarURL());
    const picture = new Picture();
    picture.sendAvatar(message);
  }
});

client.login(process.env.token);
