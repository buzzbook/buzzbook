import React, {useState} from "react";
import PropTypes from "prop-types";
import Tippy from '@tippyjs/react';
import '../../css/DropdownButton.css';

export default function DropdownButton({ children, label, className }) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <Tippy content={<div className='dropdownContainer'>{children}</div>}
      trigger='click'
      interactive
      placement='bottom-start'
      onShow={show}
      onHide={hide}
    >
      <button className={`dropdownButton ${className} ${visible ? 'shownFilter' : ''}`}>{label}</button>
    </Tippy>
  );
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
};