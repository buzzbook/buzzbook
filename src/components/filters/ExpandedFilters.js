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
import {instructors, caches} from "../../courses";


function ExpandedFilters() {
	const clearFilters = () => {
    dispatch(resetFilters());
    dispatch(updateSort({label: "Course ID", value: "Course ID"}))
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
          placeholder="Search..."
          value={filters.subject}
          onChange={value => updateFil(value, "subject")}
          optionList={Object.keys(subjectNames).map(key => {
            return subjectNames[key];
          })}
          isMulti
          isSearchable
          windowed
        />
				<h4 className="mt-2">Level</h4>
				<FilterSelector
          ariaLabel="Level"
          ariaDescribedBy="level-label"
          value={filters.level}
          onChange={value => updateFil(value, "level")}
          optionList={[1000, 2000, 3000, 4000, 6000, 7000, 8000, 9000]}
          isMulti
        />
				<h4 className="mt-2">Credits</h4>
				<FilterSelector
          ariaLabel="Credits"
          ariaDescribedBy="credits-label"
          value={filters.credits}
          onChange={value => updateFil(value, "credits")}
          optionList={[0, 1, 2, 3, 4, 5, 6, 9]}
          isMulti
        />
        <h4 className="mt-2">Type</h4>
        <FilterSelector
          ariaLabel="Type"
          ariaDescribedBy="type-label"
          placeholder="Search..."
          value={filters.type}
          onChange={value => updateFil(value, "type")}
          optionList={caches["scheduleTypes"]}
          isMulti
          isSearchable
        />
        <h4 className="mt-2">Instructors</h4>
        <FilterSelector
          ariaLabel="Instructors"
          ariaDescribedBy="instructors-label"
          placeholder="Search..."
          value={filters.instructors}
          onChange={value => updateFil(value, "instructors")}
          optionList={instructors}
          isMulti
          isSearchable
          windowed
        />
			</div>
		</div>
	);
}

export default ExpandedFilters;
