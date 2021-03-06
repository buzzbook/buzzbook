import React from "react";
import Helmet from "react-helmet";
import HomeCourseList from "../components/home/HomeCourseList";
import graphic from "../img/homePageGraphic.png";
import "../css/Home.css";

function Home() {
  return (
    <>
      <Helmet>
        <title>BuzzBook | Home</title>
      </Helmet>
      <div className="home-content">
        <div>
          <div style={{ fontSize: "4rem" }}>
            <b>
              <span className="theme">Georgia Tech</span>
            </b>{" "}
            <i>BuzzBook</i>
          </div>
          <h5>
            A reenvisioned course catalog. Made by students, for students.
					</h5>
          <div className="home-course-list-container">
            <h5>My Saved Courses:</h5>
            <input id="select-all" type="checkbox" />
            <label htmlFor="select-all">Select All</label>
            <div className="home-course-list">
              <HomeCourseList />
            </div>
          </div>
        </div>
        <img src={graphic} alt="student" />
      </div>
    </>
  );
}

export default Home;
