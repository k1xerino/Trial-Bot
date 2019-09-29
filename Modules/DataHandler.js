const Enmap = require("enmap");
const DataStorage = new Enmap({
  name: "Trials",
  autoFetch: true,
  fetchAll: true
});

module.exports = {
  newTrial: function(user, currentusername, channel) {
    DataStorage.set(user, {name: currentusername, channel: channel, status: "trial", startdate: Date.now(), enddate: Date.now()+(14 * 24 * 3600 * 1000)});
  },

  changeStatus: function(user, status) {
    DataStorage.set(user, status, "status");
  },

  getUser: function(user) {
    return DataStorage.get(user);
  }
};
