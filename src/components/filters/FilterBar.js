import React from "react";
import Filters from "./Filters";
import ExpandedFilters from "./ExpandedFilters";
import {useDispatch} from "react-redux";
import {updateSearchQuery} from "../../redux/courseListSlice";
import filterIcon from "../../img/filterIcon.png";
import "../../css/Filters.css";

function FilterBar() {
	const dispatch = useDispatch();
	return (
		<div className="mx-0" id="filterBar">
			<div className="h-100 p-3">
				<input
					type="text"
					className="form-control mb-2"
					placeholder="Search Courses"
					onChange={e => dispatch(updateSearchQuery(e.target.value))}
				/>
			</div>
			<div className="h-100 p-3">
				<div className="d-flex">
					<img
						src={filterIcon}
						alt="filter"
						className="mr-3 icon-dark"
						style={{width: 40, height: 40, cursor: "pointer"}}
						data-toggle="modal"
						data-target="#filterModal"
					/>

					<div
						className="modal fade"
						id="filterModal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="filterModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5
										className="modal-title"
										id="filterModalLabel"
									>
										Filters
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<ExpandedFilters />
								</div>
							</div>
						</div>
					</div>
					<Filters />
				</div>
			</div>
		</div>
	);
}

export default FilterBar;
