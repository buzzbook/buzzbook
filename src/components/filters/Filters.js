import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Tippy, {useSingleton} from "@tippyjs/react";
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
import {caches} from "../../courses";
import "../../css/Filters.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";
import x from "../../img/x.png";

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
					singleton={target}
				>
					<FilterSelector
						id="sort-by-filter"
						ariaLabel="Sort By"
						ariaDescribedBy="sort-by-label"
						value={sort}
						onChange={value => dispatch(updateSort(value))}
						optionList={["Course ID", "Name"]}
					/>
				</DropdownButton>
				<DropdownButton
					label="Departments"
					className="dropdownFilter"
					singleton={target}
				>
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
				<DropdownButton
					label="Level"
					className="dropdownFilter"
					singleton={target}
				>
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
				<DropdownButton
					label="Credits"
					className="dropdownFilter"
					singleton={target}
				>
					<FilterSelector
						ariaLabel="Credits"
						ariaDescribedBy="credits-label"
						placeholder="Select..."
						value={filters.credits}
						onChange={value => updateFil(value, "credits")}
						optionList={[0, 1, 2, 3, 4, 5, 6, 9]}
						isMulti={true}
					/>
				</DropdownButton>
				<DropdownButton
					label="Time"
					className="dropdownFilter"
					singleton={target}
				></DropdownButton>
				<DropdownButton
					label="Type"
					className="dropdownFilter"
					singleton={target}
				>
					<FilterSelector
						ariaLabel="Type"
						ariaDescribedBy="type-label"
						placeholder="Select..."
						value={filters.type}
						onChange={value => updateFil(value, "type")}
						optionList={caches["scheduleTypes"]}
						isMulti={true}
					/>
				</DropdownButton>
				<Tippy
					content="Clear Filters"
					theme="translucent"
					arrow={true}
					singleton={target}
				>
					<div
						className="d-inline-block ml-2 icon-dark"
						style={{cursor: "pointer", height: "16px"}}
						onClick={clearFilters}
					>
						<img
							src={x}
							alt="x"
							height="20px"
							width="20px"
							className="d-block mb-1"
						/>
					</div>
				</Tippy>
			</div>
		</div>
	);
}

export default Filters;
