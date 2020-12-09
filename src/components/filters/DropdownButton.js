import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import "../../css/DropdownButton.css";

export default function DropdownButton({
	children,
	label,
	className,
	singleton
}) {
	return (
		<Tippy
			content={<div className="dropdownContainer">{children}</div>}
			theme="transparent"
			arrow={false}
			singleton={singleton}
		>
			<button className={`dropdownButton ${className}`}>{label}</button>
		</Tippy>
	);
}

DropdownButton.propTypes = {
	label: PropTypes.string.isRequired,
	singleton: PropTypes.object.isRequired,
	className: PropTypes.string
};
