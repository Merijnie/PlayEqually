const Game = require('../models/game.model.js');

/*---------------------------------------------------------------------*/
/* CREATE A PLAYER
/*---------------------------------------------------------------------*/
exports.create = (req, res) => {

  const game = new Game({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    homeGoals: req.body.homeGoals,
    awayGoals: req.body.awayGoals,
    status: req.body.status,
    date: req.body.date || '9999-12-31',
    time: req.body.time || '10:00',
    selection: req.body.selection
  });

  game.save()
    .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when creating game"
      });
    });

};

/*---------------------------------------------------------------------*/
/* FIND ALL PLAYERS
/*---------------------------------------------------------------------*/
exports.findAll = (req, res) => {
  Game.find()
    .then(games => {
      res.send(games);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when retrieving all games"
      });
    });
};

/*---------------------------------------------------------------------*/
/* FIND A PLAYER
/*---------------------------------------------------------------------*/
exports.findOne= (req, res) => {

  Game.findById(req.params.gameId)
      .then(game => {
          if(!game) {
              return res.status(404).send({
                  message: "Game not found with id " + req.params.gameId
              });
          }
          res.send(game);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Game not found with id " + req.params.gameId
              });
          }
          return res.status(500).send({
              message: "Error retrieving game with id " + req.params.gameId
          });
      });

};

/*---------------------------------------------------------------------*/
/* UPDATE A PLAYER
/*---------------------------------------------------------------------*/
exports.update = (req, res) => {

  if(!req.body.firstName || !req.body.lastName) {
    return res.status(400).send({
      message: "Game hometeam and awayteam cannot be empty"
    });
  }

  Game.findByIdAndUpdate(req.params.gameId, {
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    homeGoals: req.body.homeGoals,
    awayGoals: req.body.awayGoals,
    status: req.body.status,
    date: req.body.date || '9999-12-31',
    time: req.body.time || '10:00',
    selection: req.body.selection
    }, {new: true})
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });
        }
        res.send(game);
      }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Game not found with id " + req.params.gameId
        });
    }
    return res.status(500).send({
        message: "Error updating game with id " + req.params.gameId
    });
  });
};

/*---------------------------------------------------------------------*/
/* DELETE A PLAYER
/*---------------------------------------------------------------------*/
exports.delete = (req, res) => {

  Game.findByIdAndRemove(req.params.gameId)
  .then(game => {
      if(!game) {
          return res.status(404).send({
              message: "Game not found with id " + req.params.gameId
          });
      }
      res.send({message: "Game deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Game not found with id " + req.params.gameId
          });
      }
      return res.status(500).send({
          message: "Could not delete game with id " + req.params.gameId
      });
  });
};
