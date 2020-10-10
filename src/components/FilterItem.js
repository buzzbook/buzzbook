import React from "react";
import PropTypes from "prop-types";
import FilterSelector from "./FilterSelector";

export default function FilterItem({ label, className, ariaLabel, ariaDescribedBy, defaultValue, onChange, optionList }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="sort-by-label">
          {label}
				</span>
      </div>
      <FilterSelector
        className={className}
        ariaLabel={ariaLabel}
        ariaDescribedBy={ariaDescribedBy}
        defaultValue={defaultValue}
        onChange={onChange}
        optionList={optionList}
      />
    </div>
  );
}

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  ariaDescribedBy: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.string).isRequired
};