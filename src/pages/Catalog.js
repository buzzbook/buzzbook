import React from "react";
import Filters from "../components/catalog/Filters";
import CourseList from "../components/catalog/CourseList";
import CourseInfo from "../components/catalog/CourseInfo";
import Layout from "./Layout";

import "../css/Catalog.css";

function Catalog() {
	return (
    <Layout 
      id="Catalog"
      col1Content={<Filters/>}
      col2Content={<CourseList />}
      col3Content={<CourseInfo />}
    />
	);
}

export default Catalog;
