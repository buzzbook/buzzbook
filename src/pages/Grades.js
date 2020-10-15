import React from "react";
import Filters from "../components/grades/Filters";
import SelectedCourses from "../components/grades/SelectedCourses";
import "../css/Grades.css";
import CourseList from "../components/grades/CourseList";
import Layout from "./Layout";

function Grades() {

  return (
    <Layout
      id="grades"
      col1Content={(
        <div>
          <Filters />
          <CourseList />
        </div>
      )}
      col2Content={<SelectedCourses />}
      col3Content={<h1>Graph</h1>}
    />
  );
}

export default Grades;
