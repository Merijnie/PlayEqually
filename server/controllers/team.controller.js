const Team = require('../models/team.model.js');

/*---------------------------------------------------------------------*/
/* CREATE A TEAM
/*---------------------------------------------------------------------*/
exports.create = (req, res) => {

  const team = new Team({
      name: req.body.name,
      category: req.body.category,
      seasonyearstart: req.body.seasonyearstart,
      seasonyearend: req.body.seasonyearend,
      coach: req.body.coach
  });

  team.save()
    .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when creating team"
      });
    });

};

/*---------------------------------------------------------------------*/
/* FIND ALL TEAMS
/*---------------------------------------------------------------------*/
exports.findAll = (req, res) => {
  Team.find()
    .then(teams => {
      res.send(teams);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error when retrieving all teams"
      });
    });
};

/*---------------------------------------------------------------------*/
/* FIND A TEAM
/*---------------------------------------------------------------------*/
exports.findOne= (req, res) => {

  Team.findById(req.params.teamId)
      .then(team => {
          if(!team) {
              return res.status(404).send({
                  message: "Team not found with id " + req.params.teamId
              });
          }
          res.send(team);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Team not found with id " + req.params.teamId
              });
          }
          return res.status(500).send({
              message: "Error retrieving team with id " + req.params.teamId
          });
      });

};

/*---------------------------------------------------------------------*/
/* UPDATE A TEAM
/*---------------------------------------------------------------------*/
exports.update = (req, res) => {

  if(!req.body.name || !req.body.category || !req.body.seasonyearstart
     || !req.body.seasonyearend) {
    return res.status(400).send({
      message: "Team name, category and season cannot be empty"
    });
  }

  Team.findByIdAndUpdate(req.params.teamId, {
    name: req.body.name,
    category: req.body.category,
    seasonyearstart: req.body.seasonyearstart,
    seasonyearend: req.body.seasonyearend,
    coach: req.body.coach
    }, {new: true})
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        res.send(team);
      }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Team not found with id " + req.params.teamId
        });
    }
    return res.status(500).send({
        message: "Error updating team with id " + req.params.teamId
    });
  });
};

/*---------------------------------------------------------------------*/
/* DELETE A TEAM
/*---------------------------------------------------------------------*/
exports.delete = (req, res) => {

  Team.findByIdAndRemove(req.params.teamId)
  .then(team => {
      if(!team) {
          return res.status(404).send({
              message: "Team  not found with id " + req.params.teamId
          });
      }
      res.send({message: "Team deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Team  not found with id " + req.params.teamId
          });
      }
      return res.status(500).send({
          message: "Could not delete team with id " + req.params.teamId
      });
  });
};
