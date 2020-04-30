import React, { useState, useEffect } from 'react';
import { getDay, getMonth, getYear, getWeeksAgo, ymdToDate } from '../Date/dateUtil';
import { getAllWeights } from '../../service/WeightService';
import VisualizeTab from './VisualizeTab';

const VisualizeTabContainer = (props) => {
  /* State */
  const oneWeekAgo = getWeeksAgo(props.date, { n: 1});

  const [data, setData] = useState({});
  const [granularity, setGranularity] = useState('weekly');
  const [fromDate, setFromDate] = useState(oneWeekAgo);
  const [toDate, setToDate] = useState(props.date);
  const [fromDay, setFromDay] = useState(getDay(oneWeekAgo));
  const [fromMonth, setFromMonth] = useState(getMonth(oneWeekAgo));
  const [fromYear, setFromYear] = useState(getYear(oneWeekAgo));
  const [toDay, setToDay] = useState(getDay(props.date));
  const [toMonth, setToMonth] = useState(getMonth(props.date));
  const [toYear, setToYear] = useState(getYear(props.date));

/* Effects */
  useEffect(() => {
    function updateDates() {
      const fromDate = ymdToDate(fromYear, fromMonth, fromDay);
      const toDate = ymdToDate(toYear, toMonth, toDay);
      setFromDate(fromDate);
      setToDate(toDate);
    }

    async function getData() {
      const response = await getAllWeights(
        `${fromYear}/${fromMonth}/${fromDay}`,
        `${toYear}/${toMonth}/${toDay}`
      );
      const labels = [];
      const weights = [];
      response.data.forEach(({ year, month, day, weight }) => {
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
      setData(data);
    };

    updateDates();
    getData();
  }, [fromDay, fromMonth, fromYear, toDay, toMonth, toYear]);

  return (   
    <VisualizeTab
      fromDate={fromDate}
      toDate={toDate}
      onChangeFromDay={setFromDay}
      onChangeFromMonth={setFromMonth}
      onChangeFromYear={setFromYear}
      onChangeToDay={setToDay}
      onChangeToMonth={setToMonth}
      onChangeToYear={setToYear}
      lineGraphData={data}/>
  );
};

export default VisualizeTabContainer;