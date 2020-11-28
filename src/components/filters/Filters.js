import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetFilters, updateFilter, getFilters,} from "../../redux/courseListSlice";
import {subjectNames} from "../courseList/CourseList";
import DropdownButton from "./DropdownButton";
import FilterSelector from "./FilterSelector";

function Filters({filterList}) {
	const {term, credits, subject, level, core, days, time, prof} = filterList;

	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
  };

	const clearFilters = () => {
		dispatch(resetFilters());
	};

	const dispatch = useDispatch();

	//Term, Core, Time-from, Time-to, and Prof filter not implemented yet
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
				{term && (
          <DropdownButton label="Term">
              <FilterSelector
                ariaLabel="Term"
                ariaDescribedBy="term-label"
                placeholder="Select term..."
                value={filters.term}
                onChange={value => updateFil(value, "term")}
                optionList={["Any", "Fall 2020", "Spring 2021"]}
              />
          </DropdownButton>
				)}
				{credits && (
					<DropdownButton label="Credits">
						<FilterSelector
							ariaLabel="Credits"
							ariaDescribedBy="credits-label"
              placeholder="Select credits..."
              value={filters.credits}
							onChange={value => updateFil(value, "credits")}
              optionList={["Any", 1, 2, 3, 4]}
              isMulti={true}
						/>
					</DropdownButton>
				)}
				{subject && (
					<DropdownButton label="Subject">
						<FilterSelector
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
					</DropdownButton>
				)}
				{level && (
					<DropdownButton label="Level">
						<FilterSelector
							ariaLabel="Level"
              ariaDescribedBy="level-label"
              placeholder="Select levels..."
							value={filters.level}
							onChange={value => updateFil(value, "level")}
              optionList={["Any", 1000, 2000, 3000, 4000]}
              isMulti={true}
						/>
					</DropdownButton>
				)}
				{core && (
					<DropdownButton label="Core">
						<FilterSelector
							ariaLabel="Core"
              ariaDescribedBy="core-label"
              placeholder="Select cores..."
							value={filters.core}
							onChange={value => updateFil(value, "core")}
              optionList={["Any", "Test 1", "Test 2"]}
              isMulti={true}
						/>
					</DropdownButton>
				)}
				{days && (
					<DropdownButton label="Days">
						<div className="button-group">
							<button onClick={handleDayButtonClick}>M</button>
							<button onClick={handleDayButtonClick}>T</button>
							<button onClick={handleDayButtonClick}>W</button>
							<button onClick={handleDayButtonClick}>R</button>
							<button onClick={handleDayButtonClick}>F</button>
						</div>
					</DropdownButton>
				)}
				{time && (
					<DropdownButton label="Time">
						<FilterSelector
							ariaLabel="Time-from"
							ariaDescribedBy="time-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "time-from")}
							optionList={["Any", "9:00", "10:00"]}
						/>
						<FilterSelector
							ariaLabel="Time-to"
							ariaDescribedBy="time-label"
							defaultValue="Any"
							onChange={value => updateFil(value, "time-to")}
							optionList={["Any", "11:00", "12:00"]}
						/>
					</DropdownButton>
				)}
				{prof && (
					<DropdownButton label="Prof">
						<FilterSelector
							ariaLabel="Prof"
              ariaDescribedBy="prof-label"
              placeholder="Select professors..."
							value={filters.prof}
							onChange={value => updateFil(value, "prof")}
              optionList={["Any", "Mr. Smith", "Mr.Brown"]}
              isMulti={true}
						/>
					</DropdownButton>
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
