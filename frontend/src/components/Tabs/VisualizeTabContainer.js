import React, { useState, useEffect } from 'react';
import { getDay, getMonth, getMonthAsNum, getYear, getWeeksAgo, ymdToDate } from '../Date/dateUtil';
import { getAllWeight } from '../../service/WeightService';
import VisualizeTab from './VisualizeTab';

const VisualizeTabContainer = (props) => {
  /* State */
  const oneWeekAgo = getWeeksAgo(props.date, { n: 1});

  const [data, setData] = useState({});
  const [fromDate, setFromDate] = useState(oneWeekAgo);
  const [toDate, setToDate] = useState(props.date);
  const [fromDay, setFromDay] = useState(getDay(oneWeekAgo));
  const [fromMonth, setFromMonth] = useState(getMonth(oneWeekAgo));
  const [fromYear, setFromYear] = useState(getYear(oneWeekAgo));
  const [toDay, setToDay] = useState(getDay(props.date));
  const [toMonth, setToMonth] = useState(getMonth(props.date));
  const [toYear, setToYear] = useState(getYear(props.date));
  const [msg, setMsg] = useState('');

/* Effects */
  useEffect(() => {
    function updateDates() {
      const fromDate = ymdToDate(fromYear, fromMonth, fromDay);
      const toDate = ymdToDate(toYear, toMonth, toDay);
      setFromDate(fromDate);
      setToDate(toDate);
    }

    async function getData() {
      const response = await getAllWeight(
          `${fromYear}/${fromMonth}/${fromDay}`,
          `${toYear}/${toMonth}/${toDay}`
        );
      if (!response) {
        setMsg('Error: Unable to fetch data.');
        setData({});
        return;
      };
      const labels = [];
      const weights = [];
      if (response.data && response.data.err) {
        setMsg(response.data.err);
        setData({});
      }
      else {
          response.data.rows.forEach(({ year, month, day, weight }) => {
          labels.push(`${year}-${month}-${day}`);
          weights.push(weight);
        });
        const data = { labels, datasets: [{ 
          label: 'Weights',
          fill: false,
          borderColor: "#7EDE5B",
          pointRadius: 1,
          data: weights
        }]};
        setMsg('');
        setData(data);
      };
    };

    updateDates();
    getData();
  }, [fromDay, fromMonth, fromYear, toDay, toMonth, toYear]);

  const onChangeFromMonth = (e) => {
    const monthNum = getMonthAsNum(e);
    setFromMonth(monthNum);
  };

  const onChangeToMonth = (e) => {
    const monthNum = getMonthAsNum(e);
    setToMonth(monthNum);
  };

  return (   
    <VisualizeTab
      fromDate={fromDate}
      toDate={toDate}
      onChangeFromDay={setFromDay}
      onChangeFromMonth={onChangeFromMonth}
      onChangeFromYear={setFromYear}
      onChangeToDay={setToDay}
      onChangeToMonth={onChangeToMonth}
      onChangeToYear={setToYear}
      lineGraphData={data}
      msg={msg}/>
  );
};

export default VisualizeTabContainer;