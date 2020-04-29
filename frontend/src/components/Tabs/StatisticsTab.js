import React, { useState, useEffect } from 'react';
import {
  Col, Row
} from 'reactstrap';
import { getDay, getMonth, getYear, getWeeksAgo } from '../Date/dateUtil';
import Line from '../DataViz/Line'
import RangeSelector from '../Date/RangeSelector';
import { getAllWeights } from '../../service/WeightService';

const StatisticsTab = (props) => {
  const [data, setData] = useState({});
  const [granularity, setGranularity] = useState('weekly');

  const [dayFrom, setDayFrom] = useState();
  const [monthFrom, setMonthFrom] = useState();
  const [yearFrom, setYearFrom] = useState();
  const [dayTo, setDayTo] = useState(getDay(props.date));
  const [monthTo, setMonthTo] = useState(getMonth(props.date));
  const [yearTo, setYearTo] = useState(getYear(props.date));

  useEffect(() => {
    function setInitialState(date) {
      setDayFrom(getYear(date));
      setMonthFrom(getMonth(date));
      setDayFrom(getDay(date));
    };

    async function getData() {
      const oneWeekAgo = getWeeksAgo(props.date, { n: 1 });
      setInitialState(oneWeekAgo);
      const response = await getAllWeights(
        `${getYear(oneWeekAgo)}/${getMonth(oneWeekAgo)}/${getDay(oneWeekAgo)}`,
        `${getYear(props.date)}/${getMonth(props.date)}/${getDay(props.date)}`
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
  }, []);

  return (
    <Col>
      <RangeSelector
        fromDate={props.date}
        toDate={props.date}
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