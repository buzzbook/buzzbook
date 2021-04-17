import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import WindowedSelect from "react-windowed-select";

function FilterSelector(props) {
	const options = [];
	props.optionList.forEach(option => {
		options.push({value: option, label: option});
	});

	const customStyles = {
		control: base => ({
			...base,
			background: "var(--bgcolor)",
			border: "1px solid var(--boundarycolor)",
			color: "var(--secondarytextcolor)",
			borderRadius: "2rem",
			fontSize: "0.925rem",
			fontFamily: "var(--secondaryfont)",
			fontWeight: "300",
			minWidth: "200px",
			height: "2rem",
			minHeight: "2rem"
		}),
		valueContainer: (provided, state) => ({
      ...provided,
    }),
		indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '2rem !important',
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
		}),
		input: provided => ({
			...provided,
			color: "var(--primarytextcolor)"
		})
	};

	if (props.windowed) {
		return (
			<WindowedSelect
				className={props.className + " border-0 p-0"}
				styles={customStyles}
				options={options}
				value={props.value}
				placeholder={props.placeholder}
				isMulti={props.isMulti}
				isSearchable={props.isSearchable}
				closeMenuOnSelect={!props.isMulti}
				aria-label={props.ariaLabel}
				aria-describedby={props.ariaDescribedBy}
				onChange={selectedList => props.onChange(selectedList)}
			/>
		);
	}
	return (
		<Select
			className={props.className + " border-0 p-0"}
			styles={customStyles}
			options={options}
			value={props.value}
			placeholder={props.placeholder}
			isMulti={props.isMulti}
			isSearchable={props.isSearchable}
			closeMenuOnSelect={!props.isMulti}
			aria-label={props.ariaLabel}
			aria-describedby={props.ariaDescribedBy}
			onChange={selectedList => props.onChange(selectedList)}
		/>
	);
}

FilterSelector.propTypes = {
	ariaLabel: PropTypes.string.isRequired,
	ariaDescribedBy: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	optionList: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.instanceOf(Set)
	]).isRequired,
	className: PropTypes.string,
	isMulti: PropTypes.bool,
	isSearchable: PropTypes.bool,
	placeholder: PropTypes.string,
	windowed: PropTypes.bool
};

FilterSelector.defaultProps = {
	className: "",
	isMulti: false,
	isSearchable: false,
	value: null,
	placeholder: "Select...",
	onChange: () => {},
	windowed: false
};

export default FilterSelector;
