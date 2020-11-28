import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, updateFilter, getFilters, } from "../../redux/courseListSlice";
import { subjectNames } from "../courseList/CourseList";
import DropdownButton from "./DropdownButton";
import FilterSelector from "./FilterSelector";

function Filters({ filterList }) {

  const handleDayButtonClick = e => {
    e.preventDefault();
    e.target.classList.toggle("active");
  };

  const clearFilters = () => {
    dispatch(resetFilters());
  };

  const dispatch = useDispatch();

  //Term, Core, Time-from, Time-to, and Prof filter not implemented yet
  const updateFil = (value, name) => {
    dispatch(updateFilter({ name: name, value: value }));
  };

  const filters = useSelector(getFilters);

  return (
    <div>
      <div id="filters">
        <DropdownButton label="Departments" className="dropdownFilter">
          <FilterSelector
            ariaLabel="Subject"
            ariaDescribedBy="subject-label"
            placeholder="Select..."
            value={filters.subject}
            onChange={value => updateFil(value, "subject")}
            optionList={["Any"].concat(
              Object.keys(subjectNames).map(key => {
                return subjectNames[key];
              })
            )}
            isMulti={true}
          />
        </DropdownButton>
        <DropdownButton label="Level" className="dropdownFilter">
          <FilterSelector
            ariaLabel="Level"
            ariaDescribedBy="level-label"
            placeholder="Select..."
            value={filters.level}
            onChange={value => updateFil(value, "level")}
            optionList={["Any", 1000, 2000, 3000, 4000]}
            isMulti={true}
          />
        </DropdownButton>
        <DropdownButton label="Credits" className="dropdownFilter">
          <FilterSelector
            ariaLabel="Credits"
            ariaDescribedBy="credits-label"
            placeholder="Select..."
            value={filters.credits}
            onChange={value => updateFil(value, "credits")}
            optionList={["Any", 1, 2, 3, 4]}
            isMulti={true}
          />
        </DropdownButton>
        <DropdownButton label="Time" className="dropdownFilter">
        </DropdownButton>
        <DropdownButton label="Type" className="dropdownFilter">
        </DropdownButton>
        <span
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={clearFilters}
        >
          Clear Filters
					</span>
      </div>
    </div>
  );
}

export default Filters;
