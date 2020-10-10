import React from "react";
import {useDispatch} from "react-redux";
import {resetFilters, updateFilter, updateSort} from "../../redux/gradesSlice";
import {subjectNames} from "../catalog/CourseList";
import FilterItem from "../FilterItem";
import FilterSelector from "../FilterSelector";

function Filters() {
	const clearFilters = () => {
		document
			.querySelectorAll("#grades-filters .custom-select")
			.forEach(select => (select.value = "Any"));
		dispatch(resetFilters());
	};

  const dispatch = useDispatch();
  
  //Term and Core not implemented yet
	const updateFil = (value, name) =>
		dispatch(updateFilter({name: name, value: value}));
	return (
		<div>
			<div
				className="mx-n3 px-3"
				style={{borderBottom: "2px solid var(--border)"}}
			>
				<div className="mb-1 font-weight-bold">
					<span className="gt-gold">Grading Distributions</span>
				</div>
				<input type="text" className="form-control mb-2" placeholder="Search" />
        <FilterItem
          label="Sort By"
          className="custom-select"
          ariaLabel="Sort By"
          ariaDescribedBy="sort-by-label"
          defaultValue="Course ID"
          onChange={value => dispatch(updateSort(value))}
          optionList={["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]}
        />

				<div id="grades-filters">
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
          <FilterItem
            label="Term"
            className="custom-select"
            ariaLabel="Term"
            ariaDescribedBy="term-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "term")}
            optionList={["Any", "Fall 2020", "Spring 2021"]}
          />
          <FilterItem
            label="Credits"
            className="custom-select"
            ariaLabel="Credits"
            ariaDescribedBy="credits-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "credits")}
            optionList={["Any", "1", "2", "3", "4"]}
          />
          <FilterItem
            label="Subject"
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
          <FilterItem
            label="Level"
            className="custom-select"
            ariaLabel="Level"
            ariaDescribedBy="level-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "level")}
            optionList={["Any", "1000", "2000", "3000", "4000"]}
          />
          <FilterItem
            label="Core"
            className="custom-select"
            ariaLabel="Core"
            ariaDescribedBy="core-label"
            defaultValue="Any"
            onChange={value =>  updateFil(value, "core")}
            optionList={["Any", "Test 1", "Test 2"]}
          />
				</div>
			</div>
		</div>
	);
}

export default Filters;
