import React from 'react';
import { Container } from 'reactstrap';
import DateSelector from './DateSelector';
import dateUtil from './dateUtil';

const RangeSelector = (props) => {
  const { fromDate, toDate, onChangeDayFrom, onChangeMonthFrom,
    onChangeYearFrom, onChangeDayTo, onChangeMonthTo, onChangeYearTo } = props;

  console.log(fromDate);
  console.log(toDate);

  return (
    <Container className=''>
      <DateSelector
        label='From: '
        date={fromDate}
        onChangeDay={onChangeDayFrom}
        onChangeMonth={onChangeMonthFrom}
        onChangeYear={onChangeYearFrom}/>
      <DateSelector
        label='To:'
        date={toDate}
        onChangeDay={onChangeDayTo}
        onChangeMonth={onChangeMonthTo}
        onChangeYear={onChangeYearTo}/>
    </Container>
  );

};

export default RangeSelector;