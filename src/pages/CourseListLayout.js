import React, { useLayoutEffect } from "react";
import CourseList from "../components/courseList/CourseList";
import SavedCoursesDetails from "../components/savedCoursesDetails/SavedCoursesDetails";
import FilterBar from "../components/filters/FilterBar";
import { useSelector } from "react-redux";
import { getSavedCourses } from "../redux/courseListSlice";;

function Layout({ id, content, savedCoursesDetails }) {
  useLayoutEffect(() => {
    let filterBarHeight =
      document.getElementById("filterBar").getBoundingClientRect().height + 2;
    document.getElementById(
      "courseList"
    ).parentElement.style.height = `calc(93vh - ${filterBarHeight}px)`;
  });

  const savedCourses = useSelector(getSavedCourses);

  const col = (savedCoursesDetails && savedCourses.length > 0) ? 'col-6' : 'col-9';
  const contentStyle = `${col} h-100 p-3`;
  return (
    <div>
      <FilterBar />
      <div className="row mx-0" id={id}>
        <div className="col-3 h-100 p-3">{<CourseList id={id} />}</div>
        {savedCoursesDetails && savedCourses.length > 0 && (
          <div className="col-3 h-100 p-3">{<SavedCoursesDetails id={id} />}</div>
        )}
        <div className={contentStyle}>{content}</div>
      </div>
    </div>
  );
}

export default Layout;
