import React from 'react';
import { 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

const CustomDropdown = props =>
  <Dropdown isOpen={props.open} toggle={props.onToggle}>
    <DropdownToggle color="primary">
      {props.value}
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>{props.header}</DropdownItem>
      {props.items.map(item => {
        return <DropdownItem 
          key={item}
          value={item}
          onClick={props.onClick}>
            {item}
        </DropdownItem>
      })}
    </DropdownMenu>
  </Dropdown>

export default CustomDropdown;