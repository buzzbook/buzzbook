import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

export default function FilterSelector({
	className,
	ariaLabel,
	ariaDescribedBy,
	defaultValue,
	onChange,
  optionList,
  isMulti
}) {
	const options = [];
	optionList.forEach(option => {
		options.push({value: option, label: option});
	});

	const customStyles = {
    control: (base) => ({
      ...base,
      background: "var(--input)",
      borderColor: "var(--input-border)",
      color: "var(--main-text)"
    }),
    menu: (provided) => ({
      ...provided,
      background: "var(--input)",
      color: "var(--main-text)"
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "blue" : "var(--main-text)"
    }),
		multiValue: provided => ({
			...provided,
			borderRadius: "15px"
    }),
  };

	 return (
		<Select
      className={className + " form-control border-0 p-0"}
			styles={customStyles}
			options={options}
      isMulti={isMulti}
      menuColor="red"
      closeMenuOnSelect={false}
			aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      onChange={selectedList => onChange(selectedList)}
		/>
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

FilterSelector.defaultProps = {
	isMulti: false
};