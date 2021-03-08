var mysql = require('mysql2');
var dbConfig = require("./config.js");

var connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Error occurred while connecting to the DB')
    throw err
  } else {
    console.log("Connected to DB")
  }
})

// connection.query('SELECT * FROM bySection LIMIT 10', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
//
connection.query('SELECT (SELECT COUNT(*) FROM byProf) as profcount, (SELECT COUNT(*) FROM bySection) as seccount, (SELECT COUNT(*) FROM byCourse) as coursecount', (error, results, fields) => {
  if (error) throw error;
  console.log("Total Entries Loaded: ", results[0])
});

module.exports = connection;

//connection.end();
