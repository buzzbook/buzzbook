import React from "react";
import PropTypes from "prop-types";

export default function FilterSelector({
	className,
	ariaLabel,
	ariaDescribedBy,
	defaultValue,
	onChange,
	optionList
}) {
	return (
		<select
			className={className}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			defaultValue={defaultValue}
			onChange={e => onChange([{value: e.target.value, label: e.target.value}])}
		>
			{optionList.map((option, index) => {
				return <option key={index}>{option}</option>;
			})}
		</select>
	);
}

FilterSelector.propTypes = {
	className: PropTypes.string.isRequired,
	ariaLabel: PropTypes.string.isRequired,
	ariaDescribedBy: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	optionList: PropTypes.arrayOf(PropTypes.string).isRequired
};
