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
	const options = [];
	optionList.forEach(option => {
		options.push({value: option, label: option});
	});

	/* const customStyles = {
		multiValue: provided => ({
			...provided,
			borderRadius: "15px"
		})
	};

	 return (
		<Select
			className="form-control border-0 p-0"
			styles={customStyles}
			options={options}
			isMulti={true}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
		/>
	); */
	return (
		<select
			className={className}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			defaultValue={defaultValue}
			onChange={e => onChange(e.target.value)}
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
