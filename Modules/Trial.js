const DataHandler = require('./DataHandler.js');

module.exports = {
  start: function(Discord, client, msg, args) {
    console.log("Trial started with: '" + msg.content + "'");
    console.log("Args: " + args);
    if(args.length > 0) {
      let user = args[0];
      console.log("User: " + user);
      let discorduser = getUserFromMention(client, user);
      console.log("Discorduser: " + discorduser);
      console.log("Discordusername: " + discorduser.username);
      let channel = makeChannel(client, msg, discorduser);
      channel.then(function(value) {
        console.log("Channel: " + value);
        if(channel == false) msg.channel.send("Could not create channel for: " + user.username); else {
          moveToTrial(value, msg);
          sendMessage(value);
          DataHandler.newTrial(discorduser.id, discorduser.username, value);
          var dataset = DataHandler.getTrial(discorduser.id);
          console.log("DB: ");
          console.log("name: " + dataset.name);
          console.log("channel: " + dataset.channel);
          console.log("status: " + dataset.status);
          console.log("startdate: " + Date(dataset.startdate));
          console.log("enddate: " + Date(dataset.enddate));
        }
      });
      giveTrialRole(getUserFromMention(client, user), msg);
    }
  }
};

function giveTrialRole(mention, msg) {
  console.log("Giving Trial Role:");
  let guildmember = msg.guild.members.get(mention.id);
  console.log("Guildmember: " + guildmember);
  guildmember.addRole(msg.guild.roles.find(role => role.name === "Trial")).catch(console.error);
}

function getUserFromMention(client, mention) {
  console.log("Get User From Mention");
	if (!mention) return;
  if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
    if (mention.startsWith('!')) { mention = mention.slice(1); }
		return client.users.get(mention);
	}
}

function makeChannel(client, msg, discorduser) {
  console.log("Making Channel:");
  let username = discorduser.username
  console.log("User: " + discorduser.id);
  console.log("Username: " + username);
  let channel = msg.guild.createChannel(username, { type: 'text' });
  return channel;
}

function moveToTrial(channel, msg){
  console.log("Moving Channel:");
  console.log("Channel to move:" + channel);
  let category = msg.guild.channels.find(c => c.name == "Trials" && c.type == "category");
  console.log("Category to move to: " + category);
  channel.setParent(category);
}

function sendMessage(channel){
  console.log("Sending Trial Message:");
  console.log("Channel: " + channel);
  channel.send("We gather here to trial this brave person by combat!"+"\n"+"Give him the best you got!").then(msgtoreact => {
    console.log("Message: " + msgtoreact);
    msgtoreact.react("👍").then(justafterwards => {
    msgtoreact.react("👎");
    });
  });
}
