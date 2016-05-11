var mongoose = require('mongoose');


var snapshotSchema = mongoose.Schema({
  user_name: { type: String, required: true },
  tweet_data: { type: Array, required: true },
  weather_data: { type: Object, required: true },
  location: {type: String}
  }, { timestamps: true });

module.exports = mongoose.model('Snapshot', snapshotSchema);
