const mongoose = require('mongoose');
const Player = require('../models/player.model.js');
var Schema = mongoose.Schema;

const GameSchema = mongoose.Schema({
  homeTeam: {type: String, required: true},
  awayTeam: {type: String, required: true},
  homeGoals: {type: Number},
  awayGoals: {type: Number},
  status: {type: String, enum:['W', 'L', 'D', 'NA'], default: 'NA'},
  date: {type: Date}, //2019-12-31
  time: {type: String},
  selection: [ {type:Schema.Types.ObjectId, ref: Player}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);
