import React from 'react';
import dateUtil from './dateUtil';
import { Container, Row, Col } from 'reactstrap';
import Dropdown from './Dropdown';

const DateSelector = (props) => {
  const { date, onChangeDay, onChangeMonth, onChangeYear } = props;

  const days = dateUtil.getDaysForDate(date);
  const months = dateUtil.getMonths();
  const years = dateUtil.getYearsToDate(date, { startingFrom: 2010 });

  return ( 
    <Container className='dateSelector'>
      <Row className='justify-content-center'>
        <Dropdown
          header='Month'
          startValue={dateUtil.getMonthAsStr(date.getMonth())}
          items={months}
          onClick={onChangeMonth}
          valueFormatter={dateUtil.getMonthAsStr}/>
        <Dropdown
          header='Day'
          startValue={dateUtil.getDay(date)}
          items={days}
          onClick={onChangeDay}/>
        <Dropdown
          header='Year'
          startValue={dateUtil.getYear(date)}
          items={years}
          onClick={onChangeYear}/>
      </Row>
    </Container>
  )
}

export default DateSelector;