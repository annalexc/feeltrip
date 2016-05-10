var mongoose = require('mongoose');


var snapshotSchema = mongoose.Schema({
  tweet_data: { type: String, required: true },
  user_name: { type: String, required: true },
  weather_data: { type: String, required: true },
  }, { timestamps: true });

module.exports = mongoose.model('Snapshot', snapshotSchema);
