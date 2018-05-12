const express = require('express');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql');

const connection = require('./../../database.js');
// const config = require('./../../config.json');
const common = require('./common.js');

const pwdhash = common.pwdhash;
const tokenizer = common.tokenizer;
const token_auth = common.token_auth;


let router = express.Router();

router.param('id', (req, res, next, id) => {
      id = parseInt(id);
      if (isNaN(id))
            req.id = 0;
      else
            req.id = id;
      next();
});

router.get('/', (req, res) => {

      
      let classid = req.query.class;
      let courseid = req.query.course;

      console.log(req.query);
      connection.query({
            sql: 'SELECT * FROM Lesson WHERE Course_ID = ? AND Class_ID = ?'
      }, [courseid , classid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Error occured'});
                  res.end();
                  return;
            }

            if (!results[0][0])
                  res.json({err: 'Error occured'});
            else
                  res.json(results[0][0]);
      });
});

router.get('/:lessonid', (req, res) => {

      let lessonid = req.params.lessonid;
      let classid = req.query.class;
      let courseid = req.query.course;

      console.log(req.query);
      connection.query({
            sql: 'SELECT * FROM Lesson WHERE Course_ID = ? AND Class_ID = ? AND Lesson_ID = ?;'
      }, [courseid , classid, lessonid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Error occured'});
                  res.end();
                  return;
            }

            if (!results[0][0])
                  res.json({err: 'Error occured'});
            else
                  res.json(results[0][0]);
      });
});


router.post('/', (req, res) => {
      let Lname = req.body['Lname']
      let classid = req.query.class;
      let courseid = req.query.course;

      if(!Lname ||!courseid || !classid){
            res.json({err: 'no course_ID or class_ID or Lname'});
            res.end();
            return;
      }

      connection.query({
            sql: 'CALL AddLesson(? , ?, ?)'
      }, [courseid , classid, Lname], (err, results, fields) => {
            if (err) {
                  res.json({err: err});
                  res.end();
                  return;
            }

            res.json({err: null, message: 'Create lesson successfully'});
      });
});

module.exports = router;

