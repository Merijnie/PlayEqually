const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then( () => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log(err);
  console.log('Could not connect to database');
  process.exit();
});

app.get('/', (req, res) => {
    res.json({"message" : "Welcome to equal play!"});
});

require('./routes/player.routes.js')(app);
require('./routes/game.routes.js')(app);
require('./routes/team.routes.js')(app);

app.listen(port, () => {
  console.log('Listening on', port);
});
