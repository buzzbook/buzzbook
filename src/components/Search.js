import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";
import FilterSelector from "./FilterSelector";

function Search({ id, label1, label2, sortOptionList }) {

  const dispatch = useDispatch();

  const dictionary = {
    catalog: "catalogSlice",
    grades: "gradesSlice",
  }
  const importPromise = import(`../redux/${dictionary[id]}`);

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
          onChange={value => {
            importPromise.then(response => {
              dispatch(response.updateSort(value));
            });
          }}
          optionList={sortOptionList}
        />
      </FilterItem>
    </div>
  )
}

export default Search;

Search.propTypes = {
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string,
  sortOptionList: PropTypes.arrayOf(PropTypes.string),
};