import React from "react";
import {useDispatch} from "react-redux";
import {updateFilter, resetFilters, updateSort} from "../../redux/catalogSlice";
import {subjectNames} from "./CourseList";
import FilterItem from "./FilterItem";

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
				&nbsp;&nbsp;
				<span className="text-muted" style={{cursor: "pointer"}}>
					Compare
				</span>
			</div>
			<input type="text" className="form-control mb-2" placeholder="Search" />
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" id="sort-by-label">
						Sort By
					</span>
				</div>
        <FilterItem
          className="custom-select"
					ariaLabel="Sort By"
					ariaDescribedBy="sort-by-label"
					defaultValue="Course ID"
          onChange={value => dispatch(updateSort(value))}
          optionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
        />
			</div>

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
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="term-label">
							Term
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Term"
            ariaDescribedBy="term-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "term")}
            optionList={["Any", "Fall 2020", "Spring 2021"]}
          />
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="credits-label">
							Credits
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Credits"
            ariaDescribedBy="credits-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "credits")}
            optionList={["Any", "1", "2", "3", "4"]}
          />
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="subject-label">
							Subject
						</span>
					</div>
          <FilterItem
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
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="level-label">
							Level
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Level"
            ariaDescribedBy="level-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "level")}
            optionList={["Any", "1000", "2000", "3000", "4000"]}
          />
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="core-label">
							Core
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Core"
            ariaDescribedBy="core-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "core")}
            optionList={["Any", "Test 1", "Test 2"]}
          />
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text">Days</span>
					</div>
					<div className="button-group">
						<button onClick={handleDayButtonClick}>M</button>
						<button onClick={handleDayButtonClick}>T</button>
						<button onClick={handleDayButtonClick}>W</button>
						<button onClick={handleDayButtonClick}>R</button>
						<button onClick={handleDayButtonClick}>F</button>
					</div>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="time-label">
							Time
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Time-from"
            ariaDescribedBy="time-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "time-from")}
            optionList={["Any", "9:00", "10:00"]}
          />
          <FilterItem
            className="custom-select"
            ariaLabel="Time-to"
            ariaDescribedBy="time-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "time-to")}
            optionList={["Any", "11:00", "12:00"]}
          />
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="prof-label">
							Prof
						</span>
					</div>
          <FilterItem
            className="custom-select"
            ariaLabel="Prof"
            ariaDescribedBy="prof-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "prof")}
            optionList={["Any", "Mr. Smith", "Mr.Brown"]}
          />
				</div>
			</div>
		</div>
	);
}

export default Filters;
