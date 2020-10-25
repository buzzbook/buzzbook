import React from "react";
import CourseInfo from "../components/catalog/CourseInfo";
import Layout from "./Layout";

import "../css/Catalog.css";

function Catalog() {
	return <Layout id="catalog" content={<CourseInfo />} />;
}

export default Catalog;
