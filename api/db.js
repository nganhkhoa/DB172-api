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

router.get('/course', (req, res)=> {
      connection.query({
            sql: 'SELECT * FROM Course'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
})

router.get('/course/:courseid', (req, res) => {
      
      connection.query({
            sql: 'SELECT * FROM Course WHERE Course_ID = ?'
      }, [req.params.courseid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/course/:courseid/:classid', (req, res) => {
      let courseid = req.params.courseid;
      let classid = req.params.classid;
      connection.query({
            sql: 'SELECT * FROM Class WHERE Course_ID = ? AND Class_ID = ?'
      }, [courseid, classid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/course/:courseid/:classid/:lessonid', (req, res) => {
      let courseid = req.params.courseid;
      let classid = req.params.classid;
      let lessonid = req.params.lessonid;
      connection.query({
            sql: 'SELECT * FROM Lesson WHERE Course_ID = ? AND Class_ID = ? AND Lesson_ID = ?'
      }, [courseid, classid, lessonid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/class', (req, res) => {
      connection.query({
            sql: 'SELECT * FROM Class'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/lesson', (req, res) => {
      connection.query({
            sql: 'SELECT * FROM Lesson'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

router.get('/content', (req, res) => {
      connection.query({
            sql: 'SELECT * FROM Content'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'ERR'});
                  res.end();
            }

            res.json({err: null, result: results});
      });
});

module.exports = router;