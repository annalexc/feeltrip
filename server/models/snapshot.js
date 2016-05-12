var mongoose = require('mongoose');


var SnapshotSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  tweet_data: { type: Array, required: true },
  weather_data: { type: Array, required: true },
  location: { type: String, required: true },
  }, { timestamps: true });

module.exports = mongoose.model('Snapshot', SnapshotSchema);
