const Enmap = require('enmap');
const DataStorage = new Enmap({
  name: "Trials",
  autoFetch: true,
  fetchAll: true
});

module.exports = {
  newTrial: function(userid, username, trialchannel) {
    var sdate = Date.now();
    var edate = Date.now()+(14*24*60*3600+100);
    DataStorage.set(userid,{
      name: username,
      channel: trialchannel,
      startdate: sdate,
      enddate: Date.now()+(14*24*60*3600+100)
    });
    console.log("Inserting into DB:\n"+
                "User:" + userid+
                "Channel")
  },
  getTrial: function(userid) {
    return DataStorage.get(userid);
  }
};
