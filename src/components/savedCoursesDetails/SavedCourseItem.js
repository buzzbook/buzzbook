import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {selectProfessor, selectSemester, getSavedCourses} from "../../redux/courseListSlice";
import FilterSelector from "../filters/FilterSelector";

function SavedCourseItem(course) {

  const dispatch = useDispatch();
  const savedCourses = useSelector(getSavedCourses);

  const [instructorList, updateInstructorList] = useState([]);
  
  useEffect(() => {
    fetch(`https://c4citk6s9k.execute-api.us-east-1.amazonaws.com/test/data/course?courseID=${course.courseID}`)
    .then(response => response.json())
    .then(data => {
      let newInstructorList = data.raw.map(prof => prof.instructor_name);
      newInstructorList.unshift("All Professors");
      updateInstructorList(newInstructorList);
    });
  }, []);
	return (
		<div className="p-2 mb-2 rounded">
			<div className="position-relative">
				<div style={{maxWidth: "calc(100% - 25px)"}}>
					<div className="text-cutoff">
						<h5 className="d-inline">
							<b>{course.courseID}</b>
						</h5>
						&nbsp;&nbsp;&nbsp;
						<span>{course.name}</span>
					</div>
					<FilterSelector
						placeholder="All Professors"
						optionList={instructorList}
            value={savedCourses[course.courseID]["professorFilter"]}
            onChange={(value) => dispatch(selectProfessor({ [course.courseID]: value }))}
						ariaLabel="Professors"
						ariaDescribedBy="profs-label"
					/>
					<FilterSelector
						placeholder="All Semesters"
						optionList={["All Semesters", "Spring 21", "Fall 20", "Spring 20"]}
            value={savedCourses[course.courseID]["semesterFilter"]}
            onChange={(value) => dispatch(selectSemester({ [course.courseID]: value }))}
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
