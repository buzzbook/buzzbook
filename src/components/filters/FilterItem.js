import React from "react";
import PropTypes from "prop-types";

export default function FilterItem({ children, label }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="sort-by-label">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
};