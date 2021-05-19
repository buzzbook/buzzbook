import React from "react";
import PropTypes from "prop-types";
import FilterSelector from "../filters/FilterSelector";

function SavedCourseItem(course) {

  const instructorList = Object.values(course.sections).map(section => {
    return section[1][0][4][0];
  });

  // removes duplicate professors
  const instructorSet = new Set(instructorList);

	return (
		<div className="p-2 mb-2 rounded">
			<div className="position-relative">
				<div /*style={{maxWidth: "calc(100% - 25px)"}} */>
					<div className="text-cutoff">
						<h5 className="d-inline">
							<b>{course.courseID}</b>
						</h5>
						&nbsp;&nbsp;&nbsp;
						<span>{course.name}</span>
					</div>
					<FilterSelector
						placeholder="All Professors"
						optionList={Array.from(instructorSet)}
						ariaLabel="Proffesors"
						ariaDescribedBy="profs-label"
					/>
					<FilterSelector
						placeholder="All Semesters"
						optionList={["Spring 21", "Fall 20", "Spring 20"]}
						ariaLabel="Semesters"
						ariaDescribedBy="semesters-label"
					/>
					<div style={{fontSize: "0.9rem"}}>
						<span>
							Grade Average: 3.66
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span>
							{course.grade}
						</span>
						<span style={{fontWeight: "900"}}>
							&nbsp;&bull;&nbsp;
						</span>
						<span>Graph</span>
					</div>
				</div>
			</div>
		</div>
	);
}

SavedCourseItem.propTypes = {
	courseID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	credits: PropTypes.number.isRequired,
	grade: PropTypes.string.isRequired
};

export default SavedCourseItem;
