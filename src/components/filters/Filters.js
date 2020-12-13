import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Tippy, {useSingleton} from "@tippyjs/react";
import {resetFilters, updateFilter, getFilters, updateSort, getSort} from "../../redux/courseListSlice";
import {subjectNames} from "../courseList/CourseList";
import DropdownButton from "./DropdownButton";
import FilterSelector from "./FilterSelector";
import {instructors, caches} from "../../courses";
import "../../css/Filters.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";
import x from "../../img/x.png";

function Filters() {
	const clearFilters = () => {
		dispatch(resetFilters());
		dispatch(updateSort({label: "Course ID", value: "Course ID"}));
	};

	const dispatch = useDispatch();

	const updateFil = (value, name) => {
		dispatch(updateFilter({value: value, name: name}));
	};

	const sort = useSelector(getSort);
	const filters = useSelector(getFilters);

	const [source, target] = useSingleton({
		overrides: ["theme", "arrow"]
	});

	return (
		<div id="filter-container">
			<div id="filters">
				<Tippy
					interactive
					singleton={source}
					moveTransition="transform 0.5s"
					placement="bottom"
					trigger="mouseenter"
					theme="transparent"
					arrow={false}
					interactiveBorder={50}
				/>

				<DropdownButton
					label="Sort By"
					className="dropdownFilter"
					highlight={sort.value !== "Course ID"}
					singleton={target}
				>
					<FilterSelector
						id="sort-by-filter"
						ariaLabel="Sort By"
						ariaDescribedBy="sort-by-label"
						value={sort}
						onChange={value => dispatch(updateSort(value))}
						optionList={["Course ID", "Name", "Grade"]}
					/>
				</DropdownButton>
				<DropdownButton
					label="Departments"
					className="dropdownFilter"
					highlight={filters.subject && filters.subject.length > 0}
					singleton={target}
				>
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
				</DropdownButton>
				<DropdownButton
					label="Level"
					className="dropdownFilter"
					highlight={filters.level && filters.level.length > 0}
					singleton={target}
				>
					<FilterSelector
						ariaLabel="Level"
						ariaDescribedBy="level-label"
						value={filters.level}
						onChange={value => updateFil(value, "level")}
						optionList={[1000, 2000, 3000, 4000, 6000, 7000, 8000, 9000]}
						isMulti
					/>
				</DropdownButton>
				<DropdownButton
					label="Credits"
					className="dropdownFilter"
					highlight={filters.credits && filters.credits.length > 0}
					singleton={target}
				>
					<FilterSelector
						ariaLabel="Credits"
						ariaDescribedBy="credits-label"
						value={filters.credits}
						onChange={value => updateFil(value, "credits")}
						optionList={[0, 1, 2, 3, 4, 5, 6, 9]}
						isMulti
					/>
				</DropdownButton>
				<DropdownButton
					label="Type"
					className="dropdownFilter"
					highlight={filters.type && filters.type.length > 0}
					singleton={target}
				>
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
				</DropdownButton>
				<DropdownButton
					label="Instructors"
					className="dropdownFilter"
					highlight={filters.instructors && filters.instructors.length > 0}
					singleton={target}
				>
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
				</DropdownButton>
				{/* <DropdownButton
					label="Time"
					className="dropdownFilter"
					singleton={target}
				></DropdownButton> */}
				<Tippy content="Clear Filters" theme="translucent" arrow={true} singleton={target}>
					<div
						className="d-inline-block ml-2 icon-dark"
						style={{cursor: "pointer", height: "16px"}}
						onClick={clearFilters}
					>
						<img src={x} alt="x" height="20px" width="20px" className="d-block mb-1" />
					</div>
				</Tippy>
			</div>
		</div>
	);
}

export default Filters;
