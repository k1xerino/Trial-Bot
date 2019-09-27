const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on("message", msg => {
  if (!msg.content.startsWith("!")) return;
  var withoutPrefix = msg.content.slice(1);
  var split = withoutPrefix.split(" ");
  var command = split[0];
  var args = split.slice(1);

  switch(command) {

    // Start Trial
    case "trial":
      if(args.length > 0) {
        var usertotrial = args[0];
        msg.channel.send("trialing " + usertotrial + " for the next 2 weeks");
        msg.channel.send("Also you can steal his Avatar at: " + getUserFromMention(usertotrial).displayAvatarURL);
        giveUserTrialRole(getUserFromMention(usertotrial), msg);
        makeTrialChannel(msg, usertotrial);
      }
      break;

    // Accept Trial as Member
    case "accept":
      break;

    // Reject Trial and make him Guest again
    case "reject":
      if(args.length > 0) {
        var usertotrial = args[0];
        msg.channel.send(usertotrial + " got rejected as trial! It is not adviced to have any contact to this person!");
        removeUserTrialRole(getUserFromMention(usertotrial), msg);
      }
      break;

    // Delay Judgement for x time
    case "delay":
      if(args.length != 3) return;
      var days = args[1];
      if(args[2].toLowerCase() == "weeks") days*=7;
      msg.channel.send("Trial of " + getUserFromMention(args[0]) + " gets delayed by " + days + " days.");
      break;
  }
});

client.login(auth.token);

///////////////
// Functions //
///////////////

function makeTrialChannel(message, name) {
    var server = message.guild;

    server.createChannel("🚩"+getUserFromMention(name).username, "text").then(channel => {
      moveChannelToTrialCategory(channel, server);
      sendTrialMessage(channel);
    }).catch(console.error);
}

function moveChannelToTrialCategory(channeltomove, server){
  channeltomove.setParent(server.channels.find(c => c.name == "Trials" && c.type == "category"));
}

function sendTrialMessage(channeltomessage){
  channeltomessage.send("We gather here to trial this brave person by combat!"+"\n"+"Give him the best you got!").then(messagetoreact => {
    messagetoreact.react("➕").then(justafterwards => {
    messagetoreact.react("➖");
    });
  });
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

function giveUserTrialRole(mention, msg) {
  msg.guild.members.get(mention.id).addRole(msg.guild.roles.find(role => role.name === "Trial")).catch(console.error);
}

function removeUserTrialRole(mention, msg) {
  msg.guild.members.get(mention.id).removeRole(msg.guild.roles.find(role => role.name === "Trial")).catch(console.error);
}
