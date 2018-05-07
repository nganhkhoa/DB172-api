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

router.post('/register', (req, res) => {
      let name = req.body['username'];
      let pass = req.body['password'];
      let email = req.body['email'];

      if (!name || !pass || !email) {
            res.json({err: 'no username or password'});
            res.end();
            return;
      }

      pass = pwdhash(pass);

      connection.query({
            sql: 'CALL AddUser(?, ?, ?)'
      }, [name, pass, email], (err, results, fields) => {
            if (err) {
                  res.json({err: 'username or email already existed', msg: err});
                  res.end();
                  return;
            }
            let ret = {err: null, message: 'Successfully add new user'};
            res.json(ret);
      });
});


router.post('/login', (req, res) => {
      let name = req.body['username'];
      let pass = req.body['password'];

      if (!name || !pass) {
            res.json({err: 'no username or password'});
            res.end();
            return;
      }

      // pass = crypto.createHmac('sha256', pass).digest('hex');
      pass = pwdhash(pass);

      connection.query({
            sql: 'CALL ValidatePwdbyName(?, ?)'
      }, [name, pass], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Wrong username or password'});
                  res.end();
                  return;
            }

            try {
                  let ID = results[0][0].ID;
                  let Image = results[0].[0].Image;
                  res.json({err: null, token: tokenizer(ID), image: Image});
            }
            catch (err) {
                  res.json({err: 'Error'});
            }
      });
});


router.use('/me*', token_auth);

router.get('/me', (req, res) => {
      connection.query({
            sql: 'CALL GetUserInfo(?);'
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

router.post('/me/reset_password', (req, res) => {
      let name = req.body['username'];
      let pass = req.body['password'];
      let new_pass = req.body['new_password'];

      if (!name || !pass || !new_pass) {
            res.json({err: 'no username or password'});
            res.end();
            return;
      }

      pass = pwdhash(pass);
      new_pass = pwdhash(new_pass);

      connection.query({
            sql: 'CALL ResetPwd(?, ?, ?)'
      }, [name, pass, new_pass], (err, results, fields) => {
            if (err) {
                  res.json({err: 'Password Update failed'});
                  res.end();
                  return;
            }

            res.json({err: null, message: 'New password updated successfully'});
      });
});


router.get('/:id', (req, res) => {
      let id = req.id;
      connection.query({
            sql: 'CALL GetUserInfo(?);'
      }, [id], (err, results, fields) => {
            if (err) {
                  res.json({err: 'User not found'});
                  res.end();
                  return;
            }

            if (!results[0][0])
                  res.json({err: 'Error'});
            else
                  res.json(results[0][0]);
      });
});

module.exports = router;
