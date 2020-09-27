import React from "react";

export default function FilterItem({ className, ariaLabel, ariaDescribedBy, defaultValue, onChange, optionList }) {
  return (
    <select
      className={className}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      defaultValue={defaultValue}
      onChange={e => onChange(e.target.value)}
    >
      {optionList.map(option => {
        return <option>{option}</option>
      })}
    </select>
  );
}
