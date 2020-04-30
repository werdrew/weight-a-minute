import React from 'react';
// import { Container } from 'reactstrap';
import DateSelector from './DateSelector';

const RangeSelector = (props) =>
  <>
    <DateSelector
      label='From: '
      date={props.fromDate}
      onChangeDay={props.onChangeFromDay}
      onChangeMonth={props.onChangeFromMonth}
      onChangeYear={props.onChangeFromYear}/>
    <DateSelector
      label='To:'
      date={props.toDate}
      onChangeDay={props.onChangeToDay}
      onChangeMonth={props.onChangeToMonth}
      onChangeYear={props.onChangeToYear}/>
  </>

export default RangeSelector;