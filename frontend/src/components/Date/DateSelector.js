import React from 'react';
import dateUtil from './dateUtil';
import { Container, Row, Col } from 'reactstrap';
import Dropdown from './Dropdown';

const DateSelector = (props) => {
  const { date, onChangeDay, onChangeMonth, onChangeYear } = props;

  const days = dateUtil.days(date);
  const months = dateUtil.months();
  const years = dateUtil.years(date);

  return ( 
    <Container className='dateSelector'>
      <Row className='justify-content-center'>
        <Dropdown
          header='Month'
          startValue={dateUtil.getMonthAsStr(date)}
          items={months}
          onClick={onChangeMonth}/>
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