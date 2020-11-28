import React from "react";
import PropTypes from "prop-types";
import Tippy from '@tippyjs/react';
import '../../css/DropdownButton.css';

export default function DropdownButton({ children, label, className }) {
  return (
    <Tippy content={<div className="dropdownContainer">{children}</div>}  trigger='click' interactive placement='bottom-start' delay={[0,0]}>
      <button className={className}>{label}</button>
    </Tippy>
  );
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
};