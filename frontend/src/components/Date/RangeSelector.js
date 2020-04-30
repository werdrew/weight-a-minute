import React from 'react';
// import { Container } from 'reactstrap';
import DateSelectorContainer from './DateSelectorContainer';

const RangeSelector = (props) =>
  <>
    <DateSelectorContainer
      label='From: '
      date={props.fromDate}
      onChangeDay={props.onChangeFromDay}
      onChangeMonth={props.onChangeFromMonth}
      onChangeYear={props.onChangeFromYear}/>
    <DateSelectorContainer
      label='To:'
      date={props.toDate}
      onChangeDay={props.onChangeToDay}
      onChangeMonth={props.onChangeToMonth}
      onChangeYear={props.onChangeToYear}/>
  </>

export default RangeSelector;