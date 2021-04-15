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
  const query = 'SELECT AVG(`Course: Overall Effectiveness`) AS courseEff, AVG(`Hours per Week`) as hoursPer FROM byCourse WHERE Dept = ? AND Num LIKE ? AND Year >= 2015; SELECT AVG(`Instructor: Overall Effectiveness`) AS profEff FROM byProf WHERE Dept = ? AND Num LIKE ? AND Year >= 2015'
  //console.log(query, [req.query.dept, `num`])
  mysqlc.query(query, [req.query.dept, req.query.num || `%`, req.query.dept, req.query.num || `%`], (error, results, fields) => {
    if (error) {
      throw error
    } else {
      console.log("byCourse query sent:", req.query)
      res.send(Object.assign({}, results[0][0], results[1][0]));
    }
  })
});

Router.get("/byProfandCourse", (req, res) => {
  const query = "SELECT ROUND(AVG(`Course: Overall Effectiveness`),2) AS courseEff, ROUND(AVG(`Instructor: Overall Effectiveness`),2) AS profEff, ROUND(AVG(`Hours per Week`),2) as hoursPer"+
                " FROM byProf"+
                " WHERE Dept LIKE ? and Num LIKE ? AND Instructor LIKE ?"
  test = mysqlc.query(query, [req.query.dept, req.query.num, req.query.prof], (error, results, fields) => {
    if (error) {
      throw error
    } else {
      console.log("byProfandCourse query sent:", req.query)
      res.send(results[0])
    }
  })
  //console.log(test.sql)
})
//sample query: http://localhost:4000/byProfandCourse/?dept=ACCT&num=2101&prof=%Rupar%Katarzyna%

Router.get("/ratings", (req, res) => {
  const query =  'SELECT AVG(``)'
});

Router.get("/sql", (req, res) => {
  mysqlc.query(req.query.query, (error, results, fields) => {
    if (error) {
      throw error
    } else {
      console.log("SQL query sent:", req.query)
      res.send(results)
    }
  })
});

// Router.get("/courses", (req, res) => {

// });

module.exports = Router;

// SELECT (SELECT AVG(`Course: Overall Effectiveness`) AS courseEff, AVG(`Hours per Week`) as hoursPer FROM byCourse WHERE Dept = "CX" AND Num LIKE "4220" AND Year >= 2017) inner join (SELECT AVG(`Instructor: Overall Effectiveness`) as profEff FROM byProf WHERE Dept = "CX" AND Num LIKE 4220 AND Year >= 2017) on a.courseEff = b.profEff;
//
// SELECT (SELECT AVG(`Course: Overall Effectiveness`) AS courseEff FROM byCourse WHERE Dept = "CSE" AND Num LIKE 6220 AND Year >= 2017) AS courseEff, (SELECT AVG(`Instructor: Overall Effectiveness`) AS profEff FROM byProf WHERE Dept = "CSE" AND Num LIKE 6220 AND Year >= 2017) AS profEff
//
//
// SELECT AVG(byCourse.`Course: Overall Effectiveness`) AS courseEff, AVG(byProf.`Instructor: Overall Effectiveness`) AS instrEff FROM byCourse, byProf WHERE (byCourse.Dept = byProf.Dept) = "CSE" AND (byCourse.Num = byProf.Num) LIKE 6220 AND (byCourse.Year = byProf.Year) >= 2017
