import React from "react";
import {useDispatch} from "react-redux";
import {subjectNames} from "../courseList/CourseList";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";

function Filters({id, filterList}) {
	const {term, credits, subject, level, core, days, time, prof} = filterList;

	const dictionary = {
		catalog: "catalogSlice",
		grades: "courseListSlice"
	};
	const importPromise = import(`../redux/${dictionary[id]}`);

	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
	};

	const clearFilters = () => {
		document
			.querySelectorAll("#catalog-filters .custom-select")
			.forEach(select => (select.value = "Any"));
		importPromise.then(response => {
			dispatch(response.resetFilters());
		});
	};

	const dispatch = useDispatch();

	//Term, Core, Time-from, Time-to, and Prof filter not implemented yet
	const updateFil = (value, name) => {
		importPromise.then(response => {
			dispatch(response.updateFilter({name: name, value: value}));
		});
	};

	return (
		<div>
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
				{term && (
					<FilterItem label="Term">
						<FilterSelector
							className="custom-select"
							ariaLabel="Term"
							ariaDescribedBy="term-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "term")}
							optionList={["Any", "Fall 2020", "Spring 2021"]}
						/>
					</FilterItem>
				)}
				{credits && (
					<FilterItem label="Credits">
						<FilterSelector
							className="custom-select"
							ariaLabel="Credits"
							ariaDescribedBy="credits-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "credits")}
							optionList={["Any", "1", "2", "3", "4"]}
						/>
					</FilterItem>
				)}
				{subject && (
					<FilterItem label="Subject">
						<FilterSelector
							className="custom-select"
							ariaLabel="Subject"
							ariaDescribedBy="subject-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "subject")}
							optionList={["Any"].concat(
								Object.keys(subjectNames).map(key => {
									return subjectNames[key];
								})
							)}
						/>
					</FilterItem>
				)}
				{level && (
					<FilterItem label="Level">
						<FilterSelector
							className="custom-select"
							ariaLabel="Level"
							ariaDescribedBy="level-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "level")}
							optionList={["Any", "1000", "2000", "3000", "4000"]}
						/>
					</FilterItem>
				)}
				{core && (
					<FilterItem label="Core">
						<FilterSelector
							className="custom-select"
							ariaLabel="Core"
							ariaDescribedBy="core-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "core")}
							optionList={["Any", "Test 1", "Test 2"]}
						/>
					</FilterItem>
				)}
				{days && (
					<FilterItem label="Days">
						<div className="button-group">
							<button onClick={handleDayButtonClick}>M</button>
							<button onClick={handleDayButtonClick}>T</button>
							<button onClick={handleDayButtonClick}>W</button>
							<button onClick={handleDayButtonClick}>R</button>
							<button onClick={handleDayButtonClick}>F</button>
						</div>
					</FilterItem>
				)}
				{time && (
					<FilterItem label="Time">
						<FilterSelector
							className="custom-select"
							ariaLabel="Time-from"
							ariaDescribedBy="time-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "time-from")}
							optionList={["Any", "9:00", "10:00"]}
						/>
						<FilterSelector
							className="custom-select"
							ariaLabel="Time-to"
							ariaDescribedBy="time-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "time-to")}
							optionList={["Any", "11:00", "12:00"]}
						/>
					</FilterItem>
				)}
				{prof && (
					<FilterItem label="Prof">
						<FilterSelector
							className="custom-select"
							ariaLabel="Prof"
							ariaDescribedBy="prof-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "prof")}
							optionList={["Any", "Mr. Smith", "Mr.Brown"]}
						/>
					</FilterItem>
				)}
			</div>
		</div>
	);
}

export default Filters;
