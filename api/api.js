const express = require('express');
let router = express.Router();

router.use('/v1', require('./v1/v1.js'));

if (!process.env.PRODUCTION)
      router.use('/database', require('./db.js'));

router.all('/*', (req, res) => {
      res.send('error');
});

module.exports = router;
