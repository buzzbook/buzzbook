const fs = require("fs");
const fetch = require("node-fetch");
let data = JSON.parse(fs.readFileSync("./sp21_testdata.json"));

const IDs = Object.keys(data.courses);
var i = 0;
const interval = setInterval(() => {
	const courseID = IDs[i];
	i++;
	let courseQuery = courseID.replace(" ", "%20");
	// For CHEM 1211K/1212K
	if (courseQuery.charAt(courseQuery.length - 1) === "K") {
		courseQuery = courseQuery.substr(0, courseQuery.length - 1);
	}
	fetch(`https://c4citk6s9k.execute-api.us-east-1.amazonaws.com/test/data/course?courseID=${courseQuery}`)
		.then(resp => resp.json()) // Transform the data into json
		.then(json => {
			if (json.header instanceof Array) {
				let courseGrade = json.header[0].avg_gpa;
				console.log(`${courseID}: ${courseGrade}`);
				data.courses[courseID].push(courseGrade);
			} else console.log(json);
		})
		.then(() => {
			if (i === IDs.length - 1) {
				fs.writeFile("courseDataWithGrades.json", JSON.stringify(data), err => {
					// In case of a error throw err.
					if (err) throw err;
				});
				clearInterval(interval);
			}
		});
}, 250);
