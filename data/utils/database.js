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

const testquery1 = 'SELECT * FROM bySection LIMIT 10'
const testquery2 = 'SELECT 1 + 1 AS solution'

connection.query('SELECT (SELECT COUNT(*) FROM byProf) as profcount, (SELECT COUNT(*) FROM bySection) as seccount, (SELECT COUNT(*) FROM byCourse) as coursecount', (error, results, fields) => {
  if (error) throw error;
  console.log("Total Entries Loaded: ", results[0])
});

module.exports = connection;

//connection.end();
