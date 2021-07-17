const Discord = require('discord.js');
const BadWordDetector = require('./bad-words');

const client = new Discord.Client();
const pandaBotToken =
  'NzMxODgxOTAwOTQzMjEyNjY0.XwsgIg.KzxKAwKqRPSWd2d5CZv_BkyAjAA';
const testerBotToken =
  'NzYxNTQ4MDkxNDMwMDEwODkx.X3cM7Q.XgBy5IBrWVnHlavgk2g0AhiCh6E';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // if (message.content === 'avatar') {
  //   // message.reply("nigger here's your avatar");
  //   // message.reply(message.author.displayAvatarURL());
  //   const picture = new Picture();
  //   picture.sendAvatar(message);
  // }
  const badWordDetector = new BadWordDetector();
  if (badWordDetector.detect(message.content)) {
    message.fetch(message.id).then((msg) => msg.delete());
    message
      .reply(
        'Usage of n word is prohibited, please refrain from using such terms.'
      )
      .then((msg) => {
        msg.delete({ timeout: 6000 /*time unitl delete in milliseconds*/ });
      })
      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  } else if (!badWordDetector.checkIfAlphanumeric(message.content)) {
    message.fetch(message.id).then((msg) => msg.delete());
    message
      .reply('Please use english alphabets')
      .then((msg) => {
        msg.delete({ timeout: 6000 /*time unitl delete in milliseconds*/ });
      })
      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
});

client.login(process.env.token);
