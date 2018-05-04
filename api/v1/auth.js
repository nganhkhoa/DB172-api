const express = require('express');
const common = require('./common.js');

const token_auth = common.token_auth;


let router = express.Router();

router.use('/*', token_auth);

router.get('/', (req, res) => {
      res.json({err: null, messsage: 'The token is valid'});
});


module.exports = router;