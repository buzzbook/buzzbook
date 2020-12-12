import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import "../../css/DropdownButton.css";

export default function DropdownButton({
	children,
  label,
  highlight,
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
			<button id={(highlight) ? 'highlight' : ''} className={`dropdownButton ${className}`}>{label}</button>
		</Tippy>
	);
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
	singleton: PropTypes.object.isRequired,
	className: PropTypes.string
};

DropdownButton.defaultProps = {
	highlight: false,
};