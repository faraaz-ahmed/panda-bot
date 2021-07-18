const Discord = require('discord.js');
const BadWordDetector = require('./src/BadWordDetector/BadWordDetector');

const client = new Discord.Client();
const pandaBotToken =
  'NzMxODgxOTAwOTQzMjEyNjY0.XwsgIg.KzxKAwKqRPSWd2d5CZv_BkyAjAA';
const testerBotToken =
  'NzYxNTQ4MDkxNDMwMDEwODkx.X3cM7Q.XgBy5IBrWVnHlavgk2g0AhiCh6E';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  const badWordDetector = new BadWordDetector();
  badWordDetector.actOnBadMessage(message);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  const badWordDetector = new BadWordDetector();
  badWordDetector.actOnBadMessage(newMessage);
});

client.login(process.env.token);
