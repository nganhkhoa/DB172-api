const express = require('express');
let router = express.Router();

router.use('/user', require('./user.js'));
router.use('/course', require('./course.js'));
router.use('/auth', require('./auth.js'));
router.use('/class', require('./class.js'));
router.use('/lesson', require('./lesson.js'));


router.all('/*', (req, res) => {
      res.send('error');
});

module.exports = router;
