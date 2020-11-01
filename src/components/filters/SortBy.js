import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";
import {updateSort, getSort} from "../../redux/courseListSlice";

function SortBy({sortOptionList}) {
  const dispatch = useDispatch();
  
	const sort = useSelector(getSort);

	return (
		<div>
			<FilterItem label="Sort By">
				<FilterSelector
          id="sort-by-filter"
					className="custom-select"
					ariaLabel="Sort By"
					ariaDescribedBy="sort-by-label"
					value={sort}
					onChange={value => dispatch(updateSort(value))}
					optionList={sortOptionList}
				/>
			</FilterItem>
		</div>
	);
}

SortBy.defaultProps = {
	sortOptionList: ["Course ID", "Name", "Grade", "Difficulty", "Enrollment"]
};

SortBy.propTypes = {
	sortOptionList: PropTypes.arrayOf(PropTypes.string)
};

export default SortBy;
