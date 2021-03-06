import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkHomeCourse, checkHomeSection, getSavedCourses, updateSelectedCourse } from "../../redux/courseListSlice";
import { Link } from "react-router-dom";
import courses, { caches } from "../../scripts/courses";

function HomeCourseList() {
  const dispatch = useDispatch();
  const savedCourses = useSelector(getSavedCourses);
  if (Object.keys(savedCourses).length === 0) {
    return (
      <>
        Get started by heading over to <Link to="/catalog">Catalog</Link> and saving some courses!
      </>
    )
  }
  const HomeCourse = ({ id, name, credits, hasSavedSections, sectionList }) => {
    return (<div class="home-saved-course">
      <span>
        <input type="checkbox" onChange={() => dispatch(checkHomeCourse(id))} checked={savedCourses[id]["checked"]} />
        <Link
          onClick={() => dispatch(updateSelectedCourse(id))}
          to={`/catalog/${id.replaceAll(" ", "+")}`}
          className="text-link"
        >
          <h6 style={{ display: "inline" }}>{id} - {name} - {credits} credit{credits !== 1 && "s"}</h6>
        </Link>
      </span>
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
          {Object.keys(savedCourses[id]["sections"]).map((section, index) => {
            const sectionRaw = sectionList[section];

            let sectionID, meetings;
            [sectionID, meetings] = sectionRaw;

            let day, location, instructors;
            [, day, location, , instructors] = meetings[0];

            if (meetings.length === 0) instructors = "N/A";

            const time = meetings.length > 0 ? caches.periods[meetings[0][0]] : "N/A";

            return <tr>
              <td><input type="checkbox" onChange={() => dispatch(checkHomeSection({ [id]: section }))} checked={savedCourses[id]["sections"][section]} /></td>
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
    )
  };
  return (
    <div>
      {Object.keys(savedCourses).map((id, index) => {
        const coursesRaw = courses[id];
        const name = coursesRaw[0];
        const credits = Object.values(coursesRaw[1])[0][2];
        const savedSections = Object.keys(savedCourses[id]);
        savedSections.splice(0, 1); // remove checked
        const hasSavedSections = savedSections.length > 0;
        const sectionList = coursesRaw[1];
        return <HomeCourse
          id={id}
          name={name}
          credits={credits}
          hasSavedSections={hasSavedSections}
          sectionList={sectionList}
        />
      })}
    </div>
  );
}

export default HomeCourseList;
