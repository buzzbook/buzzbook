import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Range} from "rc-slider";
import "rc-slider/assets/index.css";
import {updateFilter, getFilters, updateSort, getSort} from "../../redux/courseListSlice"; // resetFilters
import FilterSelector from "./FilterSelector";
import {sortBy, subjects, levels, credits, types, instructorList, campuses} from "./filterOptions";
import "../../css/Filters.css";

function ExpandedFilters() {
	// const clearFilters = () => {
	// 	dispatch(resetFilters());
	// 	dispatch(updateSort({label: "Course ID", value: "Course ID"}));
	// };

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
				<div className="expanded-filters-grid">
					<div>
						<h6 className="subheadingfont">Sort By</h6>
						<FilterSelector
							id="sort-by-filter"
							ariaLabel="Sort By"
							ariaDescribedBy="sort-by-label"
							value={sort}
							onChange={value => dispatch(updateSort(value))}
							optionList={sortBy}
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Department</h6>
						<FilterSelector
							ariaLabel="Subject"
							ariaDescribedBy="subject-label"
							placeholder="Search..."
							value={filters.subject}
							onChange={value => updateFil(value, "subject")}
							optionList={subjects}
							isMulti
							isSearchable
							windowed
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Level</h6>
						<FilterSelector
							ariaLabel="Level"
							ariaDescribedBy="level-label"
							value={filters.level}
							onChange={value => updateFil(value, "level")}
							optionList={levels}
							isMulti
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Credits</h6>
						<FilterSelector
							ariaLabel="Credits"
							ariaDescribedBy="credits-label"
							value={filters.credits}
							onChange={value => updateFil(value, "credits")}
							optionList={credits}
							isMulti
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Type</h6>
						<FilterSelector
							ariaLabel="Type"
							ariaDescribedBy="type-label"
							placeholder="Search..."
							value={filters.type}
							onChange={value => updateFil(value, "type")}
							optionList={types}
							isMulti
							isSearchable
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Status</h6>
						<div className="inline">
							<label className="contentfont form-check">
								<input type="checkbox" className="form-check-input"/>
								Open
							</label>
							<label className="contentfont form-check ml-2">
								<input type="checkbox" className="form-check-input"/>
								Waitlist
							</label>
						</div>
					</div>
					<div className="timing-filter">
						<h6 className="subheadingfont">Timing Filter</h6>
					</div>
					<div className="degree-requirements">
						<h6 className="subheadingfont">Degree Requirements</h6>
					</div>
					<div>
						<h6 className="subheadingfont">Course Quality</h6>
						<Range min={0} max={5} defaultValue={[0, 5]} />
					</div>
					<div>
						<h6 className="subheadingfont">Instructors</h6>
						<FilterSelector
							ariaLabel="Instructors"
							ariaDescribedBy="instructors-label"
							placeholder="Search..."
							value={filters.instructors}
							onChange={value => updateFil(value, "instructors")}
							optionList={instructorList}
							isMulti
							isSearchable
							windowed
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Professor Quality</h6>
						<Range min={0} max={5} defaultValue={[0, 5]} />
					</div>
					<div>
						<h6 className="subheadingfont">Terms</h6>
						<FilterSelector
							ariaLabel="Terms"
							ariaDescribedBy="Terms-label"
							optionList={["Spring 21", "Spring 20", "Fall 20", "Fall 19"]}
							isSearchable
						/>
					</div>
					<div>
						<h6 className="subheadingfont">Weekly Workload</h6>
						<Range min={0} max={5} defaultValue={[0, 5]} />
					</div>
					<div>
						<h6 className="mt-2">Campus</h6>
						<FilterSelector
							ariaLabel="Campus"
							ariaDescribedBy="Campus-label"
							value={filters.campus}
							onChange={value => updateFil(value, "campus")}
							optionList={campuses}
							isSearchable
						/>
					</div>
					<div className="advanced-options">
						<h6 className=" subheadingfont">Advanced Options</h6>
						<label className="contentfont form-check">
							<input type="checkbox" className="form-check-input"/>
							Only Show Eligible
						</label>
						<label className="contentfont form-check">
							<input type="checkbox" className="form-check-input"/>
							Only Show Related
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpandedFilters;
