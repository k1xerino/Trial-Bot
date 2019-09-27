module.exports = {
  start: function(Discord, client, msg, args) {
    if(args.length > 0) {
      var usertotrial = args[0];
      msg.channel.send("trialing " + usertotrial + " for the next 2 weeks");
      giveUserTrialRole(getUserFromMention(client, usertotrial), msg);
      makeTrialChannel(client, msg, usertotrial);
    }
  }
};

function giveUserTrialRole(mention, msg) {
  msg.guild.members.get(mention.id).addRole(msg.guild.roles.find(role => role.name === "Trial")).catch(console.error);
}

function getUserFromMention(client, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

function makeTrialChannel(client, msg, name) {
    msg.guild.createChannel("🚩"+getUserFromMention(client, name).username, { type: 'text' }).then(channel => {
      moveChannelToTrialCategory(channel, msg);
      sendTrialMessage(channel);
    }).catch(console.error);
}

function moveChannelToTrialCategory(channeltomove, msg){
  channeltomove.setParent(msg.guild.channels.find(c => c.name == "Trials" && c.type == "category"));
}

function sendTrialMessage(channeltomessage){
  channeltomessage.send("We gather here to trial this brave person by combat!"+"\n"+"Give him the best you got!").then(messagetoreact => {
    messagetoreact.react("👍").then(justafterwards => {
    messagetoreact.react("👎");
    });
  });
}
