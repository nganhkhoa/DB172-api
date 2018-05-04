const express = require('express');
let router = express.Router();

router.use('/user', require('./user.js'));
router.use('/auth', require('./auth.js'));

router.all('/*', (req, res) => {
      res.send('error');
});

module.exports = router;
