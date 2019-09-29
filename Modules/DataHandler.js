const Enmap = require("enmap");
const DataStorage = new Enmap({
  name: "Trials",
  autoFetch: true,
  fetchAll: true
});

module.exports = {
  newTrial: function(user, currentusername, channel) {
    Trials.set(user, {name: currentusername, channel: channel, status: "trial", startdate: Date.now(), enddate: Date.now()+14});
  },

  changeStatus: function(user, status) {
    Trials.set(user, status, "status");
  },

  getUser: function(user) {
    return Trials.get(user);
  }
};
