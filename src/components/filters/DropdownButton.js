import React from "react";
import PropTypes from "prop-types";
import Tippy from '@tippyjs/react';

export default function DropdownButton({ children, label }) {
  return (
    <Tippy content={children}  trigger='click' interactive>
      <button>{label}</button>
    </Tippy>
  );
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
};