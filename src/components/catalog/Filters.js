import React from "react";
import {useDispatch} from "react-redux";
import {updateFilter, resetFilters, updateSort} from "../../redux/catalogSlice";
import {subjectNames} from "./CourseList";

function Filters() {
	const handleDayButtonClick = e => {
		e.preventDefault();
		e.target.classList.toggle("active");
	};
	const clearFilters = () => {
		document
			.querySelectorAll("#catalog-filters .custom-select")
			.forEach(select => (select.value = "Any"));
		dispatch(resetFilters());
	};

	const dispatch = useDispatch();
	const updateFil = (e, name) =>
		dispatch(updateFilter({name: name, value: e.target.value}));

	return (
		<div>
			<div className="mb-1 font-weight-bold">
				<span className="gt-gold" style={{cursor: "pointer"}}>
					Browse
				</span>
				&nbsp;&nbsp;
				<span className="text-muted" style={{cursor: "pointer"}}>
					Compare
				</span>
			</div>
			<input type="text" className="form-control mb-2" placeholder="Search" />
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" id="sort-by-label">
						Sort By
					</span>
				</div>
				<select
					className="custom-select"
					aria-label="Sort By"
					aria-describedby="sort-by-label"
					defaultValue="Course ID"
					onChange={e => dispatch(updateSort(e.target.value))}
				>
					<option>Course ID</option>
					<option>Name</option>
					<option>Grade</option>
					<option>Difficulty</option>
					<option>Enrollment</option>
				</select>
			</div>

			<div id="catalog-filters">
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
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="term-label">
							Term
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Term"
						aria-describedby="term-label"
						defaultValue="Any"
					>
						<option>Any</option>
						<option>Fall 2020</option>
						<option>Spring 2021</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="credits-label">
							Credits
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Credits"
						aria-describedby="credits-label"
						defaultValue="Any"
						onChange={e => updateFil(e, "credits")}
					>
						<option>Any</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="subject-label">
							Subject
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Subject"
						aria-describedby="subject-label"
						defaultValue="Any"
						onChange={e => updateFil(e, "subject")}
					>
						<option>Any</option>
						{Object.keys(subjectNames).map((key, index) => {
							return <option key={index}>{subjectNames[key]}</option>;
						})}
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="level-label">
							Level
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Level"
						aria-describedby="level-label"
						defaultValue="Any"
						onChange={e => updateFil(e, "level")}
					>
						<option>Any</option>
						<option>1000</option>
						<option>2000</option>
						<option>3000</option>
						<option>4000</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="core-label">
							Core
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Core"
						aria-describedby="core-label"
						defaultValue="Any"
					>
						<option>Any</option>
						<option>Test 1</option>
						<option>Test 2</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text">Days</span>
					</div>
					<div className="button-group">
						<button onClick={handleDayButtonClick}>M</button>
						<button onClick={handleDayButtonClick}>T</button>
						<button onClick={handleDayButtonClick}>W</button>
						<button onClick={handleDayButtonClick}>R</button>
						<button onClick={handleDayButtonClick}>F</button>
					</div>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="time-label">
							Time
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Time-from"
						aria-describedby="time-label"
						defaultValue="Any"
					>
						<option>Any</option>
						<option>9:00</option>
						<option>10:00</option>
					</select>
					<select
						className="custom-select"
						aria-label="Time-to"
						aria-describedby="time-label"
						defaultValue="Any"
					>
						<option>Any</option>
						<option>11:00</option>
						<option>12:00</option>
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="prof-label">
							Prof
						</span>
					</div>
					<select
						className="custom-select"
						aria-label="Prof"
						aria-describedby="prof-label"
						defaultValue="Any"
					>
						<option>Any</option>
						<option>Mr. Smith</option>
						<option>Mr. Brown</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Filters;
