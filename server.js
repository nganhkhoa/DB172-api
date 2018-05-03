const express = require('express');
// const connection = require('./database.js');
const apiRouter_v1 = require('./api/v1/api.js');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;


// setup and export to use
let app = express();
// module.exports = app;

app.use(bodyParser());

// api routing
app.use('/api/v1/', apiRouter_v1);

// now listen
app.listen(PORT);