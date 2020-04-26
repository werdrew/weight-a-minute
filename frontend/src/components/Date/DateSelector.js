import React from 'react';
import dateUtil from './dateUtil';
import { Container, Row, Col } from 'reactstrap';
import Dropdown from './Dropdown';

const DateSelector = (props) => {
  const { date } = props;

  const days = dateUtil.days(date);
  const months = dateUtil.months();
  const years = dateUtil.years(date);

  return ( 
    <Container className='dateSelector'>
      <Row className='justify-content-center'>
        Enter weight for { dateUtil.formatAsString(date) }.
      </Row>
      <Row className='justify-content-center'>
        <Dropdown
          header='Month'
          startValue={dateUtil.getMonthAsStr(date)}
          items={months}/>
        <Dropdown
          header='Day'
          startValue={dateUtil.getDay(date)}
          items={days}/>
        <Dropdown
          header='Year'
          startValue={dateUtil.getYear(date)}
          items={years}/>
      </Row>
    </Container>
  )
}

export default DateSelector;