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
import FilterSelector from "./FilterSelector";

function ExpandedFilters() {
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
				<h4 className="mt-2">Sort By</h4>
				<FilterSelector
					id="sort-by-filter"
					ariaLabel="Sort By"
					ariaDescribedBy="sort-by-label"
					value={sort}
					onChange={value => dispatch(updateSort(value))}
					optionList={["Course ID", "Name"]}
				/>
				<h4 className="mt-2">Department</h4>
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
				<h4 className="mt-2">Level</h4>
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
				<h4 className="mt-2">Credits</h4>
				<FilterSelector
					ariaLabel="Credits"
					ariaDescribedBy="credits-label"
					placeholder="Select..."
					value={filters.credits}
					onChange={value => updateFil(value, "credits")}
					optionList={[1, 2, 3, 4]}
					isMulti={true}
				/>
			</div>
		</div>
	);
}

export default ExpandedFilters;
