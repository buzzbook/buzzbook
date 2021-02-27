import React from "react";
import { useSelector } from "react-redux";
import { getSavedCourses } from "../../redux/courseListSlice";
import { Link } from "react-router-dom";
import courses, { caches } from "../../scripts/courses";


function HomeCourseList() {
  const savedCourses = useSelector(getSavedCourses);
  if (Object.keys(savedCourses).length === 0) {
    return (
      <>
        Get started by heading over to <Link to="/catalog">Catalog</Link> and saving some courses!
      </>
    )
  }
  return (
    <div>
      {Object.keys(savedCourses).map((id, index) => {
        const coursesRaw = courses[id];
        const name = coursesRaw[0];
        const credits = Object.values(coursesRaw[1])[0][2];
        const hasSavedSections = Object.keys(savedCourses[id]).length > 0;
        return <div class="home-saved-course">
          <h6>{id} - {name} - {credits} credit{credits !== 1 && "s"}</h6>
          {hasSavedSections && (
            <table className="section-table">
              <tr>
                <th style={{}}></th>
                <th style={{ width: "10%" }}>Section</th>
                <th style={{ width: "10%" }}>CRN</th>
                <th style={{ width: "10%" }}>Enrollment</th>
                <th style={{ width: "15%" }}>Time</th>
                <th style={{ width: "5%" }}>Days</th>
                <th style={{ width: "25%" }}>Location</th>
                <th style={{ width: "25%" }}>Instructor</th>
              </tr>
              {Object.keys(savedCourses[id]).map((section, index) => {
                const sectionRaw = coursesRaw[1][section];

                let sectionID, meetings;
                [sectionID, meetings] = sectionRaw;

                let day, location, instructors;
                [, day, location, , instructors] = meetings[0];

                if (meetings.length === 0) instructors = "N/A";

                const time = meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A";

                return <tr>
                  <td><input type="checkbox" /></td>
                  <td>{section}</td>
                  <td>{sectionID}</td>
                  <td>0/10</td>
                  <td>{time}</td>
                  <td>{day}</td>
                  <td>{location}</td>
                  <td>{instructors}</td>
                </tr>
              })}
            </table>
          )}
        </div>
      })}
    </div>
  );
}

export default HomeCourseList;
