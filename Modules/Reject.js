module.exports = {
  start: function(Discord, client, msg, args) {
    if(args.length > 0) {
      var usertotrial = args[0];
      msg.channel.send(usertotrial + " got rejected as trial! It is not adviced to have any contact to this person!");
      removeUserTrialRole(getUserFromMention(client, usertotrial), msg);
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
