import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";
import { updateSort } from "../redux/courseListSlice";

function SortBy ({ sortOptionList }) {
	const dispatch = useDispatch();

	return (
		<div>
			<FilterItem label="Sort By">
				<FilterSelector
					className="custom-select"
					ariaLabel="Sort By"
					ariaDescribedBy="sort-by-label"
					defaultValue={sortOptionList[0]}
					onChange={value => dispatch(updateSort(value))}
					optionList={sortOptionList}
				/>
			</FilterItem>
		</div>
	)
}

export default SortBy;

Search.propTypes = {
	sortOptionList: PropTypes.arrayOf(PropTypes.string),
};