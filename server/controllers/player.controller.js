const Player = require('../models/player.model.js');

/*---------------------------------------------------------------------*/
/* CREATE A PLAYER
/*---------------------------------------------------------------------*/
exports.create = (req, res) => {

  const player = new Player({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      timePlayed: req.body.timePlayed,
      goalsScored: req.body.goalsScored,
      numberOfSelections: req.body.numberOfSelections,
      dateOfBirth: req.body.dateOfBirth || '9999-12-31'
  });

  player.save()
    .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when creating player"
      });
    });

};

/*---------------------------------------------------------------------*/
/* FIND ALL PLAYERS
/*---------------------------------------------------------------------*/
exports.findAll = (req, res) => {
  Player.find()
    .then(players => {
      res.send(players);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when retrieving all players"
      });
    });
};

/*---------------------------------------------------------------------*/
/* FIND A PLAYER
/*---------------------------------------------------------------------*/
exports.findOne= (req, res) => {

  Player.findById(req.params.playerId)
      .then(player => {
          if(!player) {
              return res.status(404).send({
                  message: "Player not found with id " + req.params.playerId
              });
          }
          res.send(player);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Player not found with id " + req.params.playerId
              });
          }
          return res.status(500).send({
              message: "Error retrieving player with id " + req.params.playerId
          });
      });

};

/*---------------------------------------------------------------------*/
/* UPDATE A PLAYER
/*---------------------------------------------------------------------*/
exports.update = (req, res) => {

  if(!req.body.firstName || !req.body.lastName) {
    return res.status(400).send({
      message: "Player name and firstname cannot be empty"
    });
  }

  Player.findByIdAndUpdate(req.params.playerId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      timePlayed: req.body.timePlayed,
      goalsScored: req.body.goalsScored,
      numberOfSelections: req.body.numberOfSelections,
      dateOfBirth: req.body.dateOfBirth || '9999-12-31'
    }, {new: true})
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send(player);
      }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Player not found with id " + req.params.playerId
        });
    }
    return res.status(500).send({
        message: "Error updating player with id " + req.params.playerId
    });
  });
};

/*---------------------------------------------------------------------*/
/* DELETE A PLAYER
/*---------------------------------------------------------------------*/
exports.delete = (req, res) => {

  Player.findByIdAndRemove(req.params.playerId)
  .then(player => {
      if(!player) {
          return res.status(404).send({
              message: "Player not found with id " + req.params.playerId
          });
      }
      res.send({message: "Player deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Player not found with id " + req.params.playerId
          });
      }
      return res.status(500).send({
          message: "Could not delete player with id " + req.params.playerId
      });
  });
};
