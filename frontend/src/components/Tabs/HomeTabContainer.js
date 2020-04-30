import React, { useState, useEffect } from 'react';
import { getDay, getMonth, getYear, getMonthAsNum } from '../Date/dateUtil';
import { getWeight, addWeight, updateWeight, deleteWeight } from '../../service/WeightService';
import HomeTab from './HomeTab';

const isValidWeight = weight => /^\d+(\.\d+)?$/.test(weight);

const handleError = (code, setMsg) => {
  if (code === 'SQLITE_CONSTRAINT') {
    setMsg('Error: A weight has already been submitted for this date. Please update instead of submitting.');
  }
  else {
    setMsg('Error: Previously unencountered error: ' + code);
  }
}

const HomeTabContainer = (props) => {
    /* State */
    const [day, setDay] = useState(getDay(props.date));
    const [month, setMonth] = useState(getMonth(props.date));
    const [year, setYear] = useState(getYear(props.date));
    const [weight, setWeight] = useState(-1);
    const [msg, setMsg] = useState('');
  
  
    /* Effects */
    useEffect(() => {
      function setState(response) {
        setWeight(response.data.weight);
        setMsg('');
      }
  
      async function initWeight() {
        try {
          const response = await getWeight(year, month, day);
          setState(response);
        } catch (error) {
          console.error(error);
        }
      }
  
      initWeight();
    }, [year, month, day]);
  
  /* Handlers */
  const onSubmit = async ({ year, month, day, weight }) => {
    const response = await addWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else setMsg('Success!');
  };

  const onUpdate = async ({ year, month, day, weight }) => {
    const response = await updateWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else setMsg('Success!');
  };

  const onDelete = async ({ year, month, day, weight }) => {
    const response = await deleteWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else {
      setMsg('Success!');
      setWeight(-1);
    }
  };

  const onChangeDay = (e) => {
    setWeight(-1);
    setDay(e);
  };

  const onChangeMonth = (e) => {
    setWeight(-1);
    const monthNum = getMonthAsNum(e);
    setMonth(monthNum);
  }

  const onChangeYear = (e) => {
    setWeight(-1);
    setYear(e);
  }

  /* Render */
  return (
    <HomeTab
      date={props.date}
      year={year}
      month={month}
      day={day}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onChangeDay={onChangeDay}
      onChangeMonth={onChangeMonth}
      onChangeYear={onChangeYear}
      onChangeInput={e => setWeight(e.target.value)}
      weight={weight}
      valid={isValidWeight(weight)}/>
  );
};

export default HomeTabContainer;