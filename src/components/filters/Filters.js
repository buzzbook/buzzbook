import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	resetFilters,
	updateFilter,
	getFilters,
	updateSort,
	getSort
} from "../../redux/courseListSlice";
import {subjectNames} from "../courseList/CourseList";
import DropdownButton from "./DropdownButton";
import FilterSelector from "./FilterSelector";
import "../../css/Filters.css";

function Filters() {
	const clearFilters = () => {
		dispatch(resetFilters());
	};

	const dispatch = useDispatch();

	//Term, Core, Time-from, Time-to, and Prof filter not implemented yet
	const updateFil = (value, name) => {
		dispatch(updateFilter({name: name, value: value}));
	};

	const sort = useSelector(getSort);
	const filters = useSelector(getFilters);

	return (
		<div id="filter-container">
			<div id="filters">
				<DropdownButton label="Sort By" className="dropdownFilter">
					<FilterSelector
						id="sort-by-filter"
						ariaLabel="Sort By"
						ariaDescribedBy="sort-by-label"
						value={sort}
						onChange={value => dispatch(updateSort(value))}
						optionList={["Course ID", "Name"]}
					/>
				</DropdownButton>
				<DropdownButton label="Departments" className="dropdownFilter">
					<FilterSelector
						ariaLabel="Subject"
						ariaDescribedBy="subject-label"
						placeholder="Select..."
						value={filters.subject}
						onChange={value => updateFil(value, "subject")}
						optionList={Object.keys(subjectNames).map(key => {
							return subjectNames[key];
						})}
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
						optionList={[
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
				</DropdownButton>
				<DropdownButton label="Credits" className="dropdownFilter">
					<FilterSelector
						ariaLabel="Credits"
						ariaDescribedBy="credits-label"
						placeholder="Select..."
						value={filters.credits}
						onChange={value => updateFil(value, "credits")}
						optionList={[1, 2, 3, 4]}
						isMulti={true}
					/>
				</DropdownButton>
				<DropdownButton
					label="Time"
					className="dropdownFilter"
				></DropdownButton>
				<DropdownButton
					label="Type"
					className="dropdownFilter"
				></DropdownButton>
				<span
					className="text-muted"
					style={{cursor: "pointer"}}
					onClick={clearFilters}
				>
					Clear Filters
				</span>
			</div>
		</div>
	);
}

export default Filters;
