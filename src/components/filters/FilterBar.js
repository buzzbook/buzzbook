import React from "react";
import Filters from "./Filters";
import ExpandedFilters from "./ExpandedFilters";
import {useDispatch} from "react-redux";
import {updateSearchQuery} from "../../redux/courseListSlice";
//import Icon from "../../img/icon";
import iconset from "../../img/iconset.svg";
import "../../css/Filters.css";
import Icon from "../../img/icon";

function FilterBar() {
	const dispatch = useDispatch();
	return (
		<div className="mx-0" id="filterBar">
			<div className="h-100 py-3 px-4">
				<div className="searchwrapper">
					<Icon name="search"/>
					<input
						type="text"
						className="form-control"
						placeholder="Search Courses"
						onChange={e => dispatch(updateSearchQuery(e.target.value))}
					/>
				</div>
			</div>
			<div className="py-3 pl-0">
				<div className="d-flex align-items-center">
					<svg
						alt="filter"
						className="mr-3 icon-dark"
						style={{width: 20, height: 20, cursor: "pointer"}}
						data-toggle="modal"
						data-target="#filterModal"
					>
						<use href={iconset+"#icon-filter"}/>
					</svg>

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
