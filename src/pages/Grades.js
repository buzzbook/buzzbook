import React from "react";
import Helmet from "react-helmet";
import Layout from "./CourseListLayout";
import GradesGraph from "../components/grades/GradesGraph";
import { useSelector } from "react-redux";
import { getSavedCourses } from "../redux/courseListSlice";

function Grades() {
  const savedCourses = useSelector(getSavedCourses);
	return (
		<>
			<Helmet>
				<title>BuzzBook | Grades</title>
			</Helmet>
      <Layout
        id="grades"
        savedCoursesDetails
        content={
          (Object.keys(savedCourses).length === 0) ?
            (
              <div className="text-center">
                <br />
                <h3>Save some courses to get started!</h3>
                <br />
                <img
                  src={require("../img/gradesPageGraphic.png")}
                  alt="select courses"
                  style={{ maxHeight: "60vh", width: "auto" }}
                />
              </div>
            )
            :
            (<GradesGraph />)
        }
      />
		</>
	);
}

export default Grades;
