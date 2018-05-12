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

      let courseid = req.query.course;

      connection.query({
            sql: 'SELECT OpenDate, EndDate, Teacher_ID, NoLesson FROM Class WHERE Course_ID = ? ;'
      }, [courseid], (err, results, fields) => {
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


router.get('/:classid', (req, res) => {

      let classid = req.params.classid;
      let courseid = req.query.course;

      connection.query({
            sql: 'SELECT OpenDate, EndDate, Teacher_ID, NoLesson FROM Class WHERE Course_ID = ? AND Class_ID = ?;'
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

router.post('/', (req, res) => {
      

      let courseid = req.query.course;
      let teacherid = req.body['teacherid'];

      if(!courseid || !teacherid){
            res.json({err: 'no course_ID or teacher_ID'});
            res.end();
            return;
      }

      connection.query({
            sql: 'CALL AddClass(? , ?)'
      }, [courseid , teacherid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Can not create class'});
                  res.end();
                  return;
            }

            res.json({err: null, message: 'Create class successfully'});
      });
});

module.exports = router;