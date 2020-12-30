import React from "react";
import Helmet from "react-helmet";
import CourseInfo from "../components/catalog/CourseInfo";
import Layout from "./CourseListLayout";
//import Alert from "../components/settings/Alerts";

import "../css/Catalog.css";

function Catalog() {
	return (
		<>
			<Helmet>
				<title>BuzzBook | Catalog</title>
			</Helmet>
			<Layout id="catalog" content={<CourseInfo />} />
		</>
	);
}

export default Catalog;
