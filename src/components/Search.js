import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateSort } from "../redux/catalogSlice";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";

export default function Search({ label1, label2, sortOptionList }) {

  const dispatch = useDispatch();

  return (
    <div>
      <div className="mb-1 font-weight-bold">
        <span className="gt-gold" style={{ cursor: "pointer" }}>
          {label1}
        </span>&nbsp;&nbsp;
        {label2 &&
          <span className="text-muted" style={{ cursor: "pointer" }}>
            {label2}
          </span>
        }
      </div>
      <input type="text" className="form-control mb-2" placeholder="Search" />
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
  );
}

Search.propTypes = {
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string,
  sortOptionList: PropTypes.arrayOf(PropTypes.string),
};