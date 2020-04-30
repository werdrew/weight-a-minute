import React from 'react';
// import { Container } from 'reactstrap';
import DateSelector from './DateSelector';

const RangeSelector = (props) => {
  const { fromDate, toDate, onChangeFromDay, onChangeFromMonth,
    onChangeFromYear, onChangeToDay, onChangeToMonth, onChangeToYear } = props;

  return (
    <>
      <DateSelector
        label='From: '
        date={fromDate}
        onChangeDay={onChangeFromDay}
        onChangeMonth={onChangeFromMonth}
        onChangeYear={onChangeFromYear}/>
      <DateSelector
        label='To:'
        date={toDate}
        onChangeDay={onChangeToDay}
        onChangeMonth={onChangeToMonth}
        onChangeYear={onChangeToYear}/>
    </>
  );

};

export default RangeSelector;