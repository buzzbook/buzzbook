var courses = [
	{
		courseID: "MATH 1553",
		name: "Intro to Linear Algebra",
		enrollment: {
			current: 86,
			max: 100
		},
		credits: 2,
		grade: "B",
		ratings: {
			interest: 4,
			difficulty: 3.5
		},
		description:
			"An introduction to linear alegbra including eigenvalues and eigenvectors, applications to linear systems, least squares.",
		prerequisites:
			"Undergraduate Semester level MATH 1113 Minimum Grade of D or SAT Mathematics 600 or MATH SECTION SCORE 620 or Converted ACT Math 600 or ACT Math 26 or Undergraduate Semester level MATH 15X2 Minimum Grade of T or Undergraduate Semester level MATH 1X52 Minimum Grade of T or Undergraduate Semester level MATH 1552 Minimum Grade of D",
		enrollRestrictions:
			"Credit not awarded for both MATH 1553 and MATH 1522, MATH 1502, MATH 1504, MATH 1512, MATH 1554 or MATH 1564.",
		sections: [
			{
				type: "Lecture",
				courseNumber: "91514",
				id: "G",
				time: "12:30-1:45",
				days: "TR",
				location: "Weber SST 3",
				instructor: "TBA",
				enrollment: {
					current: 51,
					max: 51
				}
			},
			{
				type: "Studio",
				courseNumber: "81120",
				id: "G01",
				time: "8:25-9:15",
				days: "MW",
				location: "Skiles 170",
				instructor: "TBA",
				enrollment: {
					current: 17,
					max: 17
				}
			},
			{
				type: "Studio",
				courseNumber: "81134",
				id: "G02",
				time: "9:30-10:20",
				days: "MW",
				location: "Skiles 268",
				instructor: "TBA",
				enrollment: {
					current: 17,
					max: 17
				}
			},
			{
				type: "Studio",
				courseNumber: "81230",
				id: "G03",
				time: "9:30-10:20",
				days: "MW",
				location: "Skiles 170",
				instructor: "TBA",
				enrollment: {
					current: 17,
					max: 17
				}
			}
		]
	},
	{
		courseID: "MATH 1554",
		name: "Linear Algebra",
		enrollment: {
			current: 92,
			max: 100
		},
		credits: 4,
		grade: "C+",
		ratings: {
			interest: 4.5,
			difficulty: 4.5
		},
		description:
			"Linear algebra eigenvalues, eigenvectors, applications to linear systems, least squares, diagnolization, quadratic forms.",
		prerequisites:
			"Undergraduate Semester level MATH 1113 Minimum Grade of D or ACT Math 26 or SAT Mathematics 600 or MATH SECTION SCORE 620 or Converted ACT Math 600 or Undergraduate Semester level MATH 1552 Minimum Grade of D or Undergraduate Semester level MATH 15X2 Minimum Grade of D or Undergraduate Semester level MATH 1X52 Minimum Grade of D or Undergraduate Semester level MATH 1551 Minimum Grade of D",
		enrollRestrictions: "None"
	},
	{
		courseID: "MATH 1771",
		name: "Finite Mathematics",
		enrollment: {
			current: 51,
			max: 51
		},
		credits: 4,
		grade: "A-",
		ratings: {
			interest: 3,
			difficulty: 3
		},
		description:
			"Linear equations, matrices, linear programming, sets and counting, probability and statistics.",
		prerequisites:
			"SAT Mathematics 550 or MATH SECTION SCORE 570 or Converted ACT Math 550 or Undergraduate Semester level MATH 1113 Minimum Grade of D or ACT Math 24",
		enrollRestrictions: "None"
	},
	{
		courseID: "CS 1100",
		name: "Freshman Leap Seminar",
		enrollment: {
			current: 463,
			max: 500
		},
		credits: 1,
		grade: "A",
		ratings: {
			interest: 3,
			difficulty: 2
		},
		description:
			"Small group discussions with first year students are led by one or more faculty members and include a variety of foundational, motivational, and topical subjects for computationalist.",
		prerequisites: "None",
		enrollRestrictions: "Must be a CS Major"
	},
	{
		courseID: "CS 1301",
		name: "Introduction to Computing",
		enrollment: {
			current: 300,
			max: 400
		},
		credits: 3,
		grade: "B+",
		ratings: {
			interest: 3.5,
			difficulty: 2.5
		},
		description:
			"Introduction to computing principles and programming practices with an emphasis on the design, construction and implementation of problem solutions use of software tools.",
		prerequisites: "None",
		enrollRestrictions: "None"
	},
	{
		courseID: "CS 1332",
		name: "Data Structures and Algorithms",
		enrollment: {
			current: 250,
			max: 250
		},
		credits: 3,
		grade: "C+",
		ratings: {
			interest: 5,
			difficulty: 4
		},
		description:
			"Computer data structures and algorithms in the context of object-oriented programming. Focus on software development towards applications.",
		prerequisites: "CS 1331 grade of C or higher",
		enrollRestrictions: "None"
	},
	{
		courseID: "CS 2050",
		name: "Introduction to Discrete Mathematics for Computer Science",
		enrollment: {
			current: 80,
			max: 150
		},
		credits: 3,
		grade: "B-",
		ratings: {
			interest: 4,
			difficulty: 4.5
		},
		description:
			"Proof methods, strategy, correctness of algorithms over discrete structures. Induction and recursion. Complexity and order of growth. Number theoretic principles and algorithms. Counting and computability.",
		prerequisites: "CS 1332 grade of C or higher",
		enrollRestrictions: "Credit not allowed for both CS 2050 and CS 2051."
	},
	{
		courseID: "MATH 2550",
		name: "Introduction to Multivariable Calculus",
		enrollment: {
			current: 100,
			max: 180
		},
		credits: 2,
		grade: "B+",
		ratings: {
			interest: 3.5,
			difficulty: 3.5
		},
		description:
			"Vectors in three dimensions, curves in space, functions of several variables, partial derivatives, optimization, integration of functions of several variables. Vector Calculus not covered.",
		prerequisites: "MATH 1554 grade of C or higher",
		enrollRestrictions:
			"Credit will not be awarded for both MATH 2550 and MATH 2605 or MATH 2401 or MATH 2551 or MATH 1555."
	},
	{
		courseID: "MATH 2551",
		name: "Multivariable Calculus",
		enrollment: {
			current: 100,
			max: 180
		},
		credits: 4,
		grade: "B-",
		ratings: {
			interest: 4,
			difficulty: 4
		},
		description:
			"Multivariable calculus: Linear approximation and Taylor's theorems, Lagrange multiples and constrained optimization, multiple integration and vector analysis including the theorems of Green, Gauss, and Stokes.",
		prerequisites: "MATH 1554 grade of C or higher",
		enrollRestrictions:
			"Credit will not be awarded for both MATH 2551 and MATH 2401 or MATH 2411 or MATH 2561."
	},
	{
		courseID: "PHYS 2211",
		name: "Introductory Physics I",
		enrollment: {
			current: 500,
			max: 700
		},
		credits: 4,
		grade: "C+",
		ratings: {
			interest: 3.5,
			difficulty: 4
		},
		description:
			"A calculus-based course with a laboratory covering classical mechanics, applications of classical mechanics, oscillations, and waves",
		prerequisites: "None",
		enrollRestrictions: "None"
	},
	{
		courseID: "PHYS 2212",
		name: "Introductory Physics II",
		enrollment: {
			current: 100,
			max: 500
		},
		credits: 4,
		grade: "D+",
		ratings: {
			interest: 3,
			difficulty: 5
		},
		description:
			"A calculus-based course with laboratory covering electromagnetism, applications of electromagnetism, light, and modern physics.",
		prerequisites: "AP Mechanics Score of 5 or a C or better in PHYS 2211",
		enrollRestrictions: "None"
	},
	{
		courseID: "CHEM 1310",
		name: "General Chemistry",
		enrollment: {
			current: 400,
			max: 450
		},
		credits: 4,
		grade: "B-",
		ratings: {
			interest: 3,
			difficulty: 4
		},
		description:
			"Fundamental laws and theories of chemical reactions. Topics include atomic structure; bonding theory; stoichiometry; properties of solids, liquids and gases; chemical thermodynamics; electrochemistry; and kinetics.",
		prerequisites: "None",
		enrollRestrictions: "Credit not allowed for both CHEM 1211K and CHEM 1310."
	},
	{
		courseID: "CHEM 2311",
		name: "Organic Chemistry I",
		enrollment: {
			current: 100,
			max: 120
		},
		credits: 3,
		grade: "C",
		ratings: {
			interest: 3.5,
			difficulty: 4.5
		},
		description:
			"An introduction to structure and reactivity of organic molecules.",
		prerequisites: "A C or better in CHEM 1310",
		enrollRestrictions: "None"
	},
	{
		courseID: "CHEM 2312",
		name: "Organic Chemistry II",
		enrollment: {
			current: 90,
			max: 100
		},
		credits: 3,
		grade: "C-",
		ratings: {
			interest: 3.5,
			difficulty: 5
		},
		description:
			"The second course in the series dealing with the structure and reactivity of organic molecules.",
		prerequisites: "A C or better in CHEM 2311",
		enrollRestrictions: "None"
	},
	{
		courseID: "CHEM 2313",
		name: "Organic and Bioorganic Chemistry",
		enrollment: {
			current: 50,
			max: 60
		},
		credits: 3,
		grade: "C-",
		ratings: {
			interest: 3.5,
			difficulty: 4.5
		},
		description:
			"A second course in organic chemistry that extends the study to topics in biochemistry.",
		prerequisites: "A C or better in CHEM 2312",
		enrollRestrictions: "None"
	},
	{
		courseID: "ECON 2105",
		name: "Principles of Macroeconomics",
		enrollment: {
			current: 200,
			max: 220
		},
		credits: 3,
		grade: "A-",
		ratings: {
			interest: 3.5,
			difficulty: 2.5
		},
		description:
			"This principles of economics course is intended to introduce students to concepts that will enable them to understand and analyze economic aggregates and evaluate economic policies.",
		prerequisites: "None",
		enrollRestrictions:
			"Students can receive credit for either ECON 2100 or ECON 2101,or for ECON 2105/2106. Students cannot receive credit for ECON 2100 and ECON 2101 or for ECON 2100 and ECON 2105/2106 or for ECON 2101 and ECON 2105/2106."
	},
	{
		courseID: "ECON 2106",
		name: "Principles of Microeconomics",
		enrollment: {
			current: 200,
			max: 250
		},
		credits: 3,
		grade: "A-",
		ratings: {
			interest: 3.5,
			difficulty: 3
		},
		description:
			"This principles of economics course is intended to introduce students to concepts that will enable them to understand and analyze structure and performance of the market economy.",
		prerequisites: "None",
		enrollRestrictions:
			"Students can receive credit for either ECON 2100 or ECON 2101,or for ECON 2105/2106. Students cannot receive credit for ECON 2100 and ECON 2101 or for ECON 2100 and ECON 2105/2106 or for ECON 2101 and ECON 2105/2106."
	}
].map((course, index) => {
	course["index"] = index;
	return course;
});

var localStorage = window.localStorage;
localStorage.setItem("courses", JSON.stringify(courses));
