const mysql = require('mysql');
const config = require('./config.json');

// console.log(config.database);

var connection = mysql.createConnection(config.database);

try {
      connection.connect();
}
catch (err) {
      throw err;
}


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//       if (error) throw error;
//       console.log('The solution is: ', results[0].solution);
// });

module.exports = connection;