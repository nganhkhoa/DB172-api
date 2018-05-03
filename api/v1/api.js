const express = require('express');
let router = express.Router();

router.use('/user', require('./user.js'));

if (!process.env.PRODUCTION)
      router.use('/database', require('./db.js'));

router.all('/*', (req, res) => {
      res.send('error');
});

module.exports = router;
