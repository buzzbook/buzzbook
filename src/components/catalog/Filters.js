import React from "react";
import {useDispatch} from "react-redux";
import {updateFilter, resetFilters, updateSort} from "../../redux/catalogSlice";
import {subjectNames} from "./CourseList";
import FilterItem from "..//FilterItem";
import FilterSelector from "../FilterSelector";

function Filters() {
	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
	};
	const clearFilters = () => {
		document
			.querySelectorAll("#catalog-filters .custom-select")
			.forEach(select => (select.value = "Any"));
		dispatch(resetFilters());
	};

  const dispatch = useDispatch();
  
  //Term, Core, Time-from, Time-to, and Prof filter not implemented yet
	const updateFil = (value, name) =>
    dispatch(updateFilter({name: name, value: value}));

	return (
		<div>
			<div className="mb-1 font-weight-bold">
				<span className="gt-gold" style={{cursor: "pointer"}}>
					Browse
				</span>
				<span className="text-muted" style={{cursor: "pointer"}}>
					Compare
				</span>
			</div>
			<input type="text" className="form-control mb-2" placeholder="Search" />
      <FilterItem label="Sort By">
        <FilterSelector
          className="custom-select"
          ariaLabel="Sort By"
          ariaDescribedBy="sort-by-label"
          defaultValue="Course ID"
          onChange={value => dispatch(updateSort(value))}
          optionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
        />
      </FilterItem>

			<div id="catalog-filters">
				<div className="mb-1 font-weight-bold">
					<span className="gt-gold">Filters</span>&nbsp;&nbsp;
					<span
						className="text-muted"
						style={{cursor: "pointer"}}
						onClick={clearFilters}
					>
						Clear
					</span>
				</div>
        <FilterItem label="Term">
          <FilterSelector 
            className="custom-select"
            ariaLabel="Term"
            ariaDescribedBy="term-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "term")}
            optionList={["Any", "Fall 2020", "Spring 2021"]}
          />
        </FilterItem>
        <FilterItem label="Credits">
          <FilterSelector
            className="custom-select"
            ariaLabel="Credits"
            ariaDescribedBy="credits-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "credits")}
            optionList={["Any", "1", "2", "3", "4"]}
          />
        </FilterItem>
        <FilterItem label="Subject">
          <FilterSelector
            className="custom-select"
            ariaLabel="Subject"
            ariaDescribedBy="subject-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "subject")}
            optionList={["Any"].concat(
              Object.keys(subjectNames).map(key => {
                return subjectNames[key];
            }))}
          />
        </FilterItem>
        <FilterItem label="Level">
          <FilterSelector
            className="custom-select"
            ariaLabel="Level"
            ariaDescribedBy="level-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "level")}
            optionList={["Any", "1000", "2000", "3000", "4000"]}
          />
        </FilterItem>
        <FilterItem label="Core">
            <FilterSelector
              className="custom-select"
              ariaLabel="Core"
              ariaDescribedBy="core-label"
              defaultValue="Any"
              onChange={value =>  updateFil(value, "core")}
              optionList={["Any", "Test 1", "Test 2"]}
        />
        </FilterItem>
        <FilterItem label="Days">
          <div className="button-group">
            <button onClick={handleDayButtonClick}>M</button>
            <button onClick={handleDayButtonClick}>T</button>
            <button onClick={handleDayButtonClick}>W</button>
            <button onClick={handleDayButtonClick}>R</button>
            <button onClick={handleDayButtonClick}>F</button>
          </div>
        </FilterItem>
				<FilterItem label="Time">
          <FilterSelector
            className="custom-select"
            ariaLabel="Time-from"
            ariaDescribedBy="time-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "time-from")}
            optionList={["Any", "9:00", "10:00"]}
          />
          <FilterSelector
            className="custom-select"
            ariaLabel="Time-to"
            ariaDescribedBy="time-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "time-to")}
            optionList={["Any", "11:00", "12:00"]}
          />
        </FilterItem>
					
        <FilterItem label="Prof">
          <FilterSelector
            className="custom-select"
            ariaLabel="Prof"
            ariaDescribedBy="prof-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "prof")}
            optionList={["Any", "Mr. Smith", "Mr.Brown"]}
          />
        </FilterItem>
			</div>
		</div>
	);
}

export default Filters;
