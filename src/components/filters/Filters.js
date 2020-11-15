import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	resetFilters,
	updateFilter,
	getFilters
} from "../../redux/courseListSlice";
import {subjectNames} from "../courseList/CourseList";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";

function Filters({filterList}) {
	const {credits, subject, level, days, time, prof} = filterList;

	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
	};

	const clearFilters = () => {
		dispatch(resetFilters());
	};

	const dispatch = useDispatch();

	//Time-from, Time-to, and Prof filter not implemented yet
	const updateFil = (value, name) => {
		dispatch(updateFilter({name: name, value: value}));
	};

	const filters = useSelector(getFilters);

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
				{credits && (
					<FilterItem label="Credits">
						<FilterSelector
							className="custom-select"
							ariaLabel="Credits"
							ariaDescribedBy="credits-label"
							placeholder="Select credits..."
							value={filters.credits}
							onChange={value => updateFil(value, "credits")}
							optionList={["Any", 1, 2, 3, 4]}
							isMulti={true}
						/>
					</FilterItem>
				)}
				{subject && (
					<FilterItem label="Subject">
						<FilterSelector
							className="custom-select"
							ariaLabel="Subject"
							ariaDescribedBy="subject-label"
							placeholder="Select subjects..."
							value={filters.subject}
							onChange={value => updateFil(value, "subject")}
							optionList={["Any"].concat(
								Object.keys(subjectNames).map(key => {
									return subjectNames[key];
								})
							)}
							isMulti={true}
						/>
					</FilterItem>
				)}
				{level && (
					<FilterItem label="Level">
						<FilterSelector
							className="custom-select"
							ariaLabel="Level"
							ariaDescribedBy="level-label"
							placeholder="Select levels..."
							value={filters.level}
							onChange={value => updateFil(value, "level")}
							optionList={[
								"Any",
								1000,
								2000,
								3000,
								4000,
								6000,
								7000,
								8000,
								9000
							]}
							isMulti={true}
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
							placeholder="Select professors..."
							value={filters.prof}
							onChange={value => updateFil(value, "prof")}
							optionList={["Any", "Mr. Smith", "Mr.Brown"]}
							isMulti={true}
						/>
					</FilterItem>
				)}
			</div>
		</div>
	);
}

Filters.defaultProps = {
	filterList: {
		credits: true,
		subject: true,
		level: true,
		days: true,
		time: true,
		prof: true
	}
};

export default Filters;
