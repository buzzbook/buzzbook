import React from "react";
import {useDispatch} from "react-redux";
import {resetFilters, updateFilter} from "../../redux/courseListSlice";
import {subjectNames} from "../courseList/CourseList";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";
import FilterMultiSelector from "./FilterMultiSelector";

function Filters({filterList}) {
	const {term, credits, subject, level, core, days, time, prof} = filterList;

	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
	};

	const clearFilters = () => {
		document
			.querySelectorAll("#filters .custom-select")
			.forEach(select => (select.value = "Any"));
		dispatch(resetFilters());
	};

	const dispatch = useDispatch();

	//Term, Core, Time-from, Time-to, and Prof filter not implemented yet
	const updateFil = (value, name) => {
		dispatch(updateFilter({name: name, value: value}));
	};

	return (
		<div>
			<div id="filters">
				<div className="mb-1 font-weight-bold text-right">
					<span
						className="text-muted"
						style={{cursor: "pointer"}}
						onClick={clearFilters}
					>
						Clear Filters
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
						<FilterMultiSelector
							className="custom-select"
							ariaLabel="Credits"
							ariaDescribedBy="credits-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "credits")}
							optionList={["Any", 1, 2, 3, 4]}
						/>
					</FilterItem>
				)}
				{subject && (
					<FilterItem label="Subject">
						<FilterMultiSelector
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
						<FilterMultiSelector
							className="custom-select"
							ariaLabel="Level"
							ariaDescribedBy="level-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "level")}
							optionList={["Any", 1000, 2000, 3000, 4000]}
						/>
					</FilterItem>
				)}
				{core && (
					<FilterItem label="Core">
						<FilterMultiSelector
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
						<FilterMultiSelector
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

Filters.defaultProps = {
	filterList: {
		term: true,
		credits: true,
		subject: true,
		level: true,
		core: true,
		days: true,
		time: true,
		prof: true
	}
};

export default Filters;
