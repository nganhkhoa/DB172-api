const express = require('express');
// const connection = require('./database.js');
const apiRouter = require('./api/api.js');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;


// setup and export to use
let app = express();
// module.exports = app;

app.use(bodyParser());

// api routing
app.use('/api', apiRouter);

// now listen
app.listen(PORT);