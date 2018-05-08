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

router.get('/:contentid', (req, res) => {

      let contentid = req.params.contentid;
      let classid = req.query.class;
      let courseid = req.query.course;
      let lessonid = req.query.lesson;

      console.log(req.query);
      connection.query({
            sql: 'CALL GetContent(? , ? , ? , ?);'
      }, [courseid , classid, lessonid, contentid], (err, results, fields) => {
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

      let classid = req.query.class;
      let courseid = req.query.course;
      let lessonid = req.query.lesson;

      let title = req.body['title'];
      let text = req.body['text'];
      let type = req.body['type'];

      if(!lessonid ||!courseid || !classid ||!title ||!text || !type){
            res.json({err: 'lack of information'});
            res.end();
            return;
      }

      connection.query({
            sql: 'CALL AddContent(?, ?, ?, ?, ?, ?)'
      }, [courseid , classid, lessonid, title, text, type],
      (err, results, fields) => {
            if (err) {
                  res.json({err:err});
                  res.end();
                  return;
            }

            res.json({err: null, message: 'Create content successfully'});
      });
});

module.exports = router;

