import React from "react";
import CourseList from "../components/catalog/CourseList";
import CourseInfo from "../components/catalog/CourseInfo";
import Search from "../components/Search";
import Filters from "../components/Filters";
import Layout from "./Layout";

import "../css/Catalog.css";

function Catalog() {
  const filterList = {term: true, credits: true, subject: true, level: true, core: true, days: true, time: true, prof: true}
  return (
    <Layout
      id="Catalog"
      col1Content={(
        <div>
          <Search
            label1="Browse"
            label2="Compare"
            sortOptionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
          />
          <Filters filterList={filterList}/>
        </div>)}
      col2Content={<CourseList />}
      col3Content={<CourseInfo />}
    />
  );
}

export default Catalog;
