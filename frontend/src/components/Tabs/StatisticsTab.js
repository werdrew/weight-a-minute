import React, { useState, useEffect } from 'react';
import {
  Col, Row
} from 'reactstrap';
import { getDay, getMonth, getYear, getWeeksAgo, ymdToDate } from '../Date/dateUtil';
import Line from '../DataViz/Line'
import RangeSelector from '../Date/RangeSelector';
import { getAllWeights } from '../../service/WeightService';

const StatisticsTab = (props) => {
  /* State */
  const oneWeekAgo = getWeeksAgo(props.date, { n: 1});

  const [data, setData] = useState({});
  const [granularity, setGranularity] = useState('weekly');
  const [dayFrom, setDayFrom] = useState(getDay(oneWeekAgo));
  const [monthFrom, setMonthFrom] = useState(getMonth(oneWeekAgo));
  const [yearFrom, setYearFrom] = useState(getYear(oneWeekAgo));
  const [dayTo, setDayTo] = useState(getDay(props.date));
  const [monthTo, setMonthTo] = useState(getMonth(props.date));
  const [yearTo, setYearTo] = useState(getYear(props.date));

  /* Effects */
  useEffect(() => {
    async function getData() {
      const response = await getAllWeights(
        `${yearFrom}/${monthFrom}/${dayFrom}`,
        `${yearTo}/${monthTo}/${dayTo}`
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

    getData();
  }, [dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo]);

  return (   
    <Col>
      <RangeSelector
        fromDate={ymdToDate(yearFrom, monthFrom, dayFrom)}
        toDate={ymdToDate(yearTo, monthTo, dayTo)}
        onChangeDayFrom={setDayFrom}
        onChangeMonthFrom={setMonthFrom}
        onChangeYearFrom={setYearFrom}
        onChangeDayTo={setDayTo}
        onChangeMonthTo={setMonthTo}
        onChangeYearTo={setYearTo}/>
      <Line
        data={data}/>
    </Col>
  )
};

export default StatisticsTab;