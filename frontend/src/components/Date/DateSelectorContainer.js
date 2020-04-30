import React from 'react';
import { getDay, getDaysForDate, getMonths, getYear, getYearsToDate, getMonthAsStr } from './dateUtil';
import DateSelector from './DateSelector';

const DateSelectorContainer = (props) => {
  const days = getDaysForDate(props.date);
  const months = getMonths();
  const years = getYearsToDate(props.date, { startingFrom: 2010 });

  return ( 
    <DateSelector
      label={props.label}
      dayHeader={'Day'}
      monthHeader={'Month'}
      yearHeader={'Year'}
      dayStartValue={getDay(props.date)}
      monthStartValue={getMonthAsStr(props.date.getMonth())}
      yearStartValue={getYear(props.date)}
      dayItems={days}
      monthItems={months}
      yearItems={years}
      onChangeDay={props.onChangeDay}
      onChangeMonth={props.onChangeMonth}
      onChangeYear={props.onChangeYear}/>
  )
}

export default DateSelectorContainer;