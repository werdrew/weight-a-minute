import React from 'react';
import { Container, Row } from 'reactstrap';
import DropdownContainer from './DropdownContainer';

const DateSelector = (props) =>
  <Container className='dateSelector'>
    <Row className='justify-content-around'>
      {props.label && <p className='dropdown-label'>{props.label}</p>}
      <Row className='justify-content-center'>
        <DropdownContainer
          header={props.monthHeader}
          startValue={props.monthStartValue}
          items={props.monthItems}
          onClick={props.onChangeMonth}/>
        <DropdownContainer
          header={props.dayHeader}
          startValue={props.dayStartValue}
          items={props.dayItems}
          onClick={props.onChangeDay}/>
        <DropdownContainer
          header={props.yearHeader}
          startValue={props.yearStartValue}
          items={props.yearItems}
          onClick={props.onChangeYear}/>
      </Row>
    </Row>
  </Container>

export default DateSelector;