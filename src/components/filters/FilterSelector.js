import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

export default function FilterSelector({
	className,
	ariaLabel,
	ariaDescribedBy,
	value,
	onChange,
	optionList,
	isMulti,
	placeholder
}) {
	const options = [];
	optionList.forEach(option => {
		options.push({value: option, label: option});
	});

	const customStyles = {
		control: base => ({
			...base,
			background: "var(--labelcolor)",
			borderColor: "var(--inputcolor)",
			color: "var(--primarytextcolor)",
			minWidth: "150px"
		}),
		singleValue: provided => ({
			...provided,
			color: "var(--primarytextcolor)"
		}),
		menu: provided => ({
			...provided,
			background: "var(--labelcolor)",
			color: "var(--primarytextcolor)"
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isFocused ? "blue" : "var(--primarytextcolor)"
		}),
		multiValue: provided => ({
			...provided,
			borderRadius: "15px",
			background: "var(--primarytextcolor)",
			color: "var(--labelcolor)"
		}),
		multiValueLabel: provided => ({
			...provided,
			color: "var(--labelcolor)"
		})
	};

	return (
		<Select
			className={className + " form-control border-0 p-0"}
			styles={customStyles}
			options={options}
			value={value}
			placeholder={placeholder}
			isMulti={isMulti}
			closeMenuOnSelect={!isMulti}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			onChange={selectedList => onChange(selectedList)}
		/>
	);
}

FilterSelector.propTypes = {
	ariaLabel: PropTypes.string.isRequired,
	ariaDescribedBy: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	optionList: PropTypes.arrayOf(PropTypes.string).isRequired
};

FilterSelector.defaultProps = {
	className: "",
	isMulti: false,
	value: null,
	placeholder: "Select...",
	onChange: () => {}
};
