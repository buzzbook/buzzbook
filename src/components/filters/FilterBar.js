import React from "react";
import Filters from "./Filters";
import ExpandedFilters from "./ExpandedFilters";
import {useDispatch} from "react-redux";
import {updateSearchQuery} from "../../redux/courseListSlice";
//import Icon from "../../img/icon";
import iconset from "../../img/iconset.svg";
import "../../css/Filters.css";
import Icon from "../../img/icon";
import $ from 'jquery';

function FilterBar() {
	const dispatch = useDispatch();

	const openFilters = () => {
		if ($('#filtersBox').css("visibility") === "hidden"){
			$('#filtersBox').addClass('openmenu');
			$('html').click(function(event) {
		    if ($(event.target).closest('#filtersBox, .filtersIcon').length === 0) {
	        $('#filtersBox').removeClass('openmenu');
		    }
			});
		}else{
			$('#filtersBox').removeClass('openmenu');
		}
	}

	return (
		<div className="mx-0" id="filterBar">
			<div className="h-100 py-3 px-4">
				<div className="searchwrapper">
					<Icon name="search"/>
					<input
						type="text"
						className="form-control sectionlabelfont"
						placeholder="Search Courses"
						onChange={e => dispatch(updateSearchQuery(e.target.value))}
					/>
				</div>
			</div>
			<div className="py-3 pl-0">
				<div className="d-flex align-items-center">
					<svg
						alt="filter"
						className="mr-3 iconfilter filtersIcon"
						style={{width: 20, height: 20, cursor: "pointer"}}
						onClick={openFilters}
					>
						<use href={iconset+"#icon-filter"}/>
					</svg>

					<div
						id="filtersBox"
						className="position-absolute"
					>
						<div className="modal-body">
							<ExpandedFilters />
						</div>
					</div>

					<Filters />
				</div>
			</div>
		</div>
	);
}

export default FilterBar;
