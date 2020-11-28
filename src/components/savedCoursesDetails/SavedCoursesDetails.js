import React from "react";
import { useSelector } from "react-redux";
import { getSavedCourses } from "../../redux/courseListSlice";
import SavedCourseItem from "./SavedCourseItem";
import "../../css/SavedCoursesDetails.css";

const courses = JSON.parse(window.localStorage.getItem("courses"));

function SavedCoursesDetails({ id }) {
  const savedCoursesIndeces = useSelector(getSavedCourses);
  let savedCourses = [];
  savedCoursesIndeces.forEach(index => savedCourses.push(courses[index]));

  return (
    <div>
      <div style={{ height: "100%" }}>
        {savedCourses.map((course, index) => {
          return (
            <SavedCourseItem
              courseID={course.courseID}
              name={course.name}
              enrollment={course.enrollment}
              enrollmentPercent={
                (course.enrollment.current / course.enrollment.max) * 100
              }
              credits={course.credits}
              grade={course.grade}
              index={course.index}
              sections={course.sections}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SavedCoursesDetails;
