import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import DropdownButton from "./DropdownButton";
import FilterSelector from "./FilterSelector";
import {updateSort, getSort} from "../../redux/courseListSlice";

function SortBy({sortOptionList}) {
  const dispatch = useDispatch();
  
	const sort = useSelector(getSort);

	return (
		<div>
			<DropdownButton label="Sort By" className="dropdownFilter">
				<FilterSelector
          id="sort-by-filter"
					className="custom-select"
					ariaLabel="Sort By"
					ariaDescribedBy="sort-by-label"
					value={sort}
					onChange={value => dispatch(updateSort(value))}
					optionList={sortOptionList}
				/>
			</DropdownButton>
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
