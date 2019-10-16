const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  seasonyearstart: {type: String, required: true},
  seasonyearend: {type: String, required: true},
  coach: {type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);
