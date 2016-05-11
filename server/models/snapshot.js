var mongoose = require('mongoose');


<<<<<<< HEAD
var snapshotSchema = mongoose.Schema({
  user_name: { type: String, required: true },
  tweet_data: { type: Array, required: true },
  weather_data: { type: Object, required: true },
  location: {type: String}
=======
var SnapshotSchema = mongoose.Schema({
  username: { type: String, required: true },
  tweet_data: { type: Array, required: true },
  weather_data: { type: Array, required: true },
  location: { type: String, required: true },
>>>>>>> 36aa6589562440f1829055d474b26d6a27bd11e2
  }, { timestamps: true });

module.exports = mongoose.model('Snapshot', SnapshotSchema);
