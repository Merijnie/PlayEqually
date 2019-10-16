const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  timePlayed: {type: Number, default: 0},
  goalsScored: {type: Number, default: 0},
  numberOfSelections: {type: Number, default: 0},
  dateOfBirth: {type: Date}
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', PlayerSchema);
