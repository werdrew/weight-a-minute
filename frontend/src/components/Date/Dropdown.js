import React, { useState } from 'react';
import { 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

const CustomDropdown = props => {
  const { header, startValue, items } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(startValue);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return ( 
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        {value}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{header}</DropdownItem>
        {items.map(item => {
          return <DropdownItem 
            key={item}
            value={value}
            onChange={e => { console.log(e.target.value); setValue(e.target.value) }}>
              {item}
          </DropdownItem>
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CustomDropdown;