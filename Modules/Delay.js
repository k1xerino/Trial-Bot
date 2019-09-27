module.exports = {
  start: function(Discord, client, msg, args) {
    if(args.length != 3) return;
    var days = args[1];
    if(args[2].toLowerCase() == "weeks") days*=7;
    msg.channel.send("Trial of " + getUserFromMention(client, args[0]) + " gets delayed by " + days + " days.");

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
