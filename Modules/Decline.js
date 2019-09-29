const DataHandler = require('./Modules/DataHandler.js');

module.exports = {
  start: function(Discord, client, msg, args) {
    if(args.length > 0) {
      var usertotrial = args[0];
      var reason = ""
      for(var i = 1; i < args.length; i++) { reason += args[i] + " "; }
      findChannelByName(translateUsernameToChannelname(getUserFromMention(client, usertotrial).username), msg).send(usertotrial + " got declined as trial!\nReason: " + reason);
      removeUserTrialRole(getUserFromMention(client, usertotrial), msg);
      moveChannelToDeclinedCategory(findChannelByName(translateUsernameToChannelname(getUserFromMention(client, usertotrial).username), msg), msg);
    }
  }
};

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

function removeUserTrialRole(mention, msg) {
  msg.guild.members.get(mention.id).removeRole(msg.guild.roles.find(role => role.name === "Trial")).catch(console.error);
}

function moveChannelToDeclinedCategory(channeltomove, msg){
  channeltomove.setParent(msg.guild.channels.find(c => c.name == "Declined" && c.type == "category"));
}

function findChannelByName(name, msg) {
  return msg.guild.channels.find(c => c.name == name && c.type == "text");
}

function translateUsernameToChannelname(name) {
  for(var i = 0; i < name.length; i++) {
    if(name[i] == " ") name.replaceAt(i, "-");
    var listofspecials = ["[", "]"];
    for(var j = 0; j < listofspecials.length; j++) {
      if(name[i] == listofspecials[j]) {
        name.slice[1, i];
        i--;
      }
    }
  }
  return name;
}
