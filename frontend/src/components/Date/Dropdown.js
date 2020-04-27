import React, { useState } from 'react';
import { 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

const CustomDropdown = props => {
  const { header, startValue, items, onClick } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(startValue);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = e => {
    const value = e.currentTarget.textContent;
    setValue(value);
    onClick(value);
  }

  return ( 
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="primary">
        {value}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{header}</DropdownItem>
        {items.map(item => {
          return <DropdownItem 
            key={item}
            onClick={e => handleClick(e)}>
              {item}
          </DropdownItem>
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CustomDropdown;