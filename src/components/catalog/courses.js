const courses = [
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
		enrollRestrictions: "None",
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
		enrollRestrictions: "None",
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
	}
];

export default courses;