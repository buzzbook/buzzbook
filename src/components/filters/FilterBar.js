import React from "react";
import SortBy from "./SortBy";
import filterIcon from "../../img/filterIcon.png";

function FilterBar() {
	return (
		<div className="row mx-0" id="filterBar">
			<div className="col-3 h-100 p-3">
				<input
					type="text"
					className="form-control mb-2"
					placeholder="Search Courses"
				/>
			</div>
			<div className="col-9 h-100 p-3">
				<div className="d-flex">
					<img
						src={filterIcon}
						alt="filter"
						className="mr-3 icon-dark"
						style={{width: 40, height: 40}}
					/>
					<SortBy />
				</div>
			</div>
		</div>
	);
}

export default FilterBar;
