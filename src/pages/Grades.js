import React from "react";
import Filters from "../components/Filters";
import Search from "../components/Search";
import SelectedCourses from "../components/grades/SelectedCourses";
import CourseList from "../components/grades/CourseList";
import Layout from "./Layout";
import "../css/Grades.css";

function Grades() {
  const filterList = { term: true, credits: true, subject: true, level: true, core: true, days: false, time: false, prof: false }

  return (
    <Layout
      id="grades"
      col1Content={(
        <div>
          <Search
            label1="Browse"
            label2="Compare"
            sortOptionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
          />
          <Filters filterList={filterList} />
          <CourseList />
        </div>
      )}
      col2Content={<SelectedCourses />}
      col3Content={<h1>Graph</h1>}
    />
  );
}

export default Grades;
