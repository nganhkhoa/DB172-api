const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const connection = require('./../../database.js');

const config = require('./../../config.json');
const secret = config.jwt_secret;

let pwdhash = (pwd) => {
      return crypto.createHmac('sha256', pwd).digest('hex');
};

let tokenizer = (info) => {
      return jwt.sign({data: info, time: Date.now()}, secret, {
            expiresIn: '1d'
      });
};

let token_auth = (req, res, next) => {
      let t0k3n = req.headers['x-access-token'];

      if (!t0k3n) {
            res.status(403).json({err: 'No token'});
            res.end();
            return;
      }

      jwt.verify(t0k3n, secret, (err, decoded) => {
            if (err) {
                  res.status(500).json({err: 'Verify failed, token may be out of date'});
                  res.end();
                  return;
            }

            req.id = decoded.data;
            connection.query({
                  sql: 'CALL LastPwdUpdate(?);'
            }, [req.id], (err, results, fields) => {
                  if (err) {
                        res.json({err: 'Token Query Failed'});
                        res.end();
                        return;
                  }

                  let t = Date.parse(results[0][0].LastPwdUpdate);
                  // console.log(t);
                  // console.log(decoded.time);
                  if (t < decoded.time)
                        // the jwt time is after last update time
                        next();
                  else {
                        res.json({err: 'Old token'});
                        res.end();
                        return;
                  }
            });
      });
}

module.exports = {
      pwdhash: pwdhash,
      tokenizer: tokenizer,
      token_auth: token_auth
};