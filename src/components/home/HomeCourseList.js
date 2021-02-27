import React from "react";
import { useSelector } from "react-redux";
import { getSavedCourses } from "../../redux/courseListSlice";
import courses, { caches } from "../../scripts/courses";


function HomeCourseList() {
  const savedCourses = useSelector(getSavedCourses);
  console.log(savedCourses);
  return (
    <div>
      {Object.keys(savedCourses).map((id, index) => {
        const coursesRaw = courses[id];
        const name = coursesRaw[0];
        const credits = Object.values(coursesRaw[1])[0][2];
        console.log(coursesRaw);
        const hasSavedSections = Object.keys(savedCourses[id]).length > 0;
        return <div class="home-saved-course">
          {id} - {name} - {credits} credit{credits !== 1 && "s"}
          {hasSavedSections && (
            <table className="section-table">
              <tr>
                <th></th>
                <th>Section</th>
                <th>CRN</th>
                <th>Time</th>
                <th>Days</th>
                <th>Location</th>
                <th>Instructor</th>
                <th>Enrollment</th>
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
                  <td>{time}</td>
                  <td>{day}</td>
                  <td>{location}</td>
                  <td>{instructors}</td>
                  <td>0/10</td>
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
