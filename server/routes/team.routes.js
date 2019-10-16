module.exports = (app) => {
  const teams = require('../controllers/team.controller.js');

  app.post('/teams', teams.create);

  app.get('/teams', teams.findAll);

  app.get('/teams/:teamId', teams.findOne);

  app.put('/teams/:teamId', teams.update);

  app.delete('/teams/:teamId', teams.delete);

}
