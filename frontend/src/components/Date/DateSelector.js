import React from 'react';
import { getDay, getDaysForDate, getMonths, getYear, getYearsToDate, getMonthAsStr } from './dateUtil';
import { Container, Row } from 'reactstrap';
import Dropdown from './Dropdown';

const DateSelector = (props) => {
  const { label, date, onChangeDay, onChangeMonth, onChangeYear } = props;

  const days = getDaysForDate(date);
  const months = getMonths();
  const years = getYearsToDate(date, { startingFrom: 2010 });

  return ( 
    <Container className='dateSelector'>
      <Row className='justify-content-around'>
        <p className='dropdown-label'>{props.label}</p>
        <Row className='justify-content-center'>
          <Dropdown
            header='Month'
            startValue={getMonthAsStr(date.getMonth())}
            items={months}
            onClick={onChangeMonth}
            valueFormatter={getMonthAsStr}/>
          <Dropdown
            header='Day'
            startValue={getDay(date)}
            items={days}
            onClick={onChangeDay}/>
          <Dropdown
            header='Year'
            startValue={getYear(date)}
            items={years}
            onClick={onChangeYear}/>
        </Row>
      </Row>
    </Container>
  )
}

export default DateSelector;