import React, { useState } from 'react';
import CustomDropdown from './Dropdown';

const DropdownContainer = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(props.startValue);
  
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = e => {
    const value = e.target.value;
    setValue(value);
    props.onClick(value);
  }

  return ( 
    <CustomDropdown 
      value={value}
      header={props.header}
      items={props.items}
      open={dropdownOpen}
      onToggle={toggle}
      onClick={e => handleClick(e)}/>
  )
}

export default DropdownContainer;