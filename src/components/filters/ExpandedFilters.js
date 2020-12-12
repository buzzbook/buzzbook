import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
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
import "../../css/Filters.css";

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
        <div className="expanded-filters-grid">
          <div>
            <h6 className="mt-2">Sort By</h6>
            <FilterSelector
              id="sort-by-filter"
              ariaLabel="Sort By"
              ariaDescribedBy="sort-by-label"
              value={sort}
              onChange={value => dispatch(updateSort(value))}
              optionList={["Course ID", "Name"]}
            />
          </div>
          <div>
            <h6 className="mt-2">Department</h6>
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
          </div>
          <div>
            <h6 className="mt-2">Level</h6>
            <FilterSelector
              ariaLabel="Level"
              ariaDescribedBy="level-label"
              value={filters.level}
              onChange={value => updateFil(value, "level")}
              optionList={[1000, 2000, 3000, 4000, 6000, 7000, 8000, 9000]}
              isMulti
            />
          </div>
          <div>
            <h6 className="mt-2">Credits</h6>
            <FilterSelector
              ariaLabel="Credits"
              ariaDescribedBy="credits-label"
              value={filters.credits}
              onChange={value => updateFil(value, "credits")}
              optionList={[0, 1, 2, 3, 4, 5, 6, 9]}
              isMulti
            />
          </div>
          <div>
            <h6 className="mt-2">Type</h6>
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
          </div>
          <div>
            <h6 className="mt-2">Status</h6>
            <label>
              <input type="checkbox"/>
              Open
            </label>
            <label>
              <input type="checkbox"/>
              Waitlist
            </label>
          </div>
          <div className="timing-filter">
            <h6 className="mt-2">Timing Filter</h6>
          </div>
          <div className="degree-requirements">
            <h6 className="mt-2">Degree Requirements</h6>
          </div>
          <div>
            <h6 className="mt-2">Course Quality</h6>
            <Range min={0} max={5} defaultValue={[0,5]}/>
          </div>
          <div>
            <h6 className="mt-2">Instructors</h6>
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
          <div>
            <h6 className="mt-2">Professor Quality</h6>
            <Range min={0} max={5} defaultValue={[0,5]}/>
          </div>
          <div>
            <h6 className="mt-2">Terms</h6>
            <FilterSelector
              ariaLabel="Terms"
              ariaDescribedBy="Terms-label"
              optionList={["Spring 21", "Spring 20", "Fall 20", "Fall 19"]}
              isSearchable
            />
          </div>
          <div>
            <h6 className="mt-2">Weekly Workload</h6>
            <Range min={0} max={5} defaultValue={[0,5]}/>
          </div>
          <div>
            <h6 className="mt-2">Campus</h6>
            <FilterSelector
              ariaLabel="Campus"
              ariaDescribedBy="Campus-label"
              optionList={["Georgia Tech-Atlanta", "Georgia Tech-Korea", "Georgia Tech-Shanghai", "Georgia Tech-Shenzhen", "Georgia Tech-Singapore"]}
              isSearchable
            />
          </div>
          <div className="advanced-options">
            <h6 className="mt-2">Advanced Options</h6>
            <label>
              <input type="checkbox"/>
              Only Show Eligible
            </label>
            <label>
              <input type="checkbox"/>
              Only Show Related
            </label>
          </div>
        </div>
			</div>
		</div>
	);
}

export default ExpandedFilters;
