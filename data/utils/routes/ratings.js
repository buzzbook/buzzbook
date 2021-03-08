const express = require("express");
const mysqlc = require("../database");

const Router = express.Router();

Router.get("/test", (req, res) => {
  mysqlc.query('SELECT * FROM byProf LIMIT 20', (error, results, fields) => {
    if (error) {
      throw error
    } else {
      res.send(results);
    }
  });
});

Router.get("/byCourse", (req, res) => {
  //console.log(req.query.num || "Num")
  const query = 'SELECT AVG(`Course: Overall Effectiveness`) AS courseEff FROM byCourse WHERE Dept = ? AND Num LIKE ? AND Year >= 2017'
  //console.log(query, [req.query.dept, `num`])
  mysqlc.query(query, [req.query.dept, req.query.num || `%`], (error, results, fields) => {
    if (error) {
      throw error
    } else {
      console.log("byCourse query sent:", req.query)
      res.send(results[0]);
    }
  })
});

module.exports = Router;
