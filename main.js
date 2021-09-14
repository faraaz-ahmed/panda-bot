const Discord = require('discord.js');
const BadWordDetector = require('./src/BadWordDetector/BadWordDetector');
const FilteredMessageQueue = require('./src/MessageQueue/FilteredMessageQueue');
const MessageQueue = require('./src/MessageQueue/MessageQueue');

const client = new Discord.Client();
const pandaBotToken =
  'NzMxODgxOTAwOTQzMjEyNjY0.XwsgIg.KzxKAwKqRPSWd2d5CZv_BkyAjAA';
const testerBotToken =
  'NzYxNTQ4MDkxNDMwMDEwODkx.X3cM7Q.XgBy5IBrWVnHlavgk2g0AhiCh6E';

const messageQueue = new MessageQueue();
const filteredMessageQueue = new FilteredMessageQueue();
const badWordDetector = new BadWordDetector(messageQueue, filteredMessageQueue);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // badWordDetector.actOnBadMessage(message);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  // badWordDetector.actOnBadMessage(newMessage);
});

client.login(process.env.token);
