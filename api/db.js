const express = require('express');
const connection = require('./../database.js');

let router = express.Router();


router.get('/user', (req, res) => {
      connection.query({
            sql: 'SELECT * FROM User'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/course', (req, res) => {
      connection.query({
            sql: 'SELECT * FROM Course'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

module.exports = router;