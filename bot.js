const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const Trial = require('./Modules/Trial.js');
const Accept = require('./Modules/Accept.js');
const Decline = require('./Modules/Decline.js');
const Delay = require('./Modules/Delay.js');
const DataHandler = require('./Modules/DataHandler.js');

client.on("ready", () => {
  SQLHandler.startup();
});

client.on("message", msg => {
  if (!msg.content.startsWith("!")) return;
  var withoutPrefix = msg.content.slice(1);
  var split = withoutPrefix.split(" ");
  var command = split[0];
  var args = split.slice(1);

  switch(command) {

    // Start Trial
    case "trial":
      Trial.start(Discord, client, msg, args);
      break;

    // Accept Trial as Member
    case "accept":
      Accept.start(Discord, client, msg);
      break;

    // Reject Trial and make him Guest again
    case "decline":
      Decline.start(Discord, client, msg, args);
      break;

    // Delay Judgement for x time
    case "delay":
      Delay.start(Discord, client, msg, args);
      break;
  }
});

client.login(auth.token);
