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
      connection.query({
            sql:'SELECT User.Name, User.Image, User.Star,  \
                Course.Course_ID, Course.Name, Course.Description, Course.Star, \
                Course.OpenedClass, Course.Teacher_ID, Course.ImageLink \
                FROM Course, User WHERE User.User_ID = Course.Teacher_ID \
                ORDER BY Course.CreateDate DESC LIMIT 20'
      }, (err, results, fields) => {
            if (err) {
                  res.json({err: 'Error occured !!!'});
                  res.end();
                  return;
            }

            if (!results)
                  res.json({err: 'Error occured'});
            else
                  res.json(results);
      });
});


router.get('/:id', (req, res) => {
      connection.query({
            sql: 'SELECT Name, Description, Star, Length, CreateDate, OpenedClass FROM Course WHERE Course_ID = ?;'
      }, [req.id], (err, results, fields) => {
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
      let Cname = req.body['Cname'];
      let teacherid = req.body['teacherid'];

      if(!Cname || !teacherid){
            res.json({err: 'no name of course or teacher_ID'});
            res.end();
            return;
      }

      connection.query({
            sql: 'CALL AddCourse(? , ?)'
      }, [Cname , teacherid], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Can not create course'});
                  res.end();
                  return;
            }

            res.json({err: null, message: 'Create course successfully'});
      });
});

module.exports = router;