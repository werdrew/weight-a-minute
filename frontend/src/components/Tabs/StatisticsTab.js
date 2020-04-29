import React, { useState, useEffect } from 'react';
import {
  Col, Row
} from 'reactstrap';
import dateUtil from '../Date/dateUtil';
import Line from '../DataViz/Line'
import RangeSelector from '../Date/RangeSelector';
import WeightService from '../../service/WeightService';

const StatisticsTab = (props) => {
  const [data, setData] = useState({});
  const [granularity, setGranularity] = useState('weekly');

  const [dayFrom, setDayFrom] = useState();
  const [monthFrom, setMonthFrom] = useState();
  const [yearFrom, setYearFrom] = useState();
  const [dayTo, setDayTo] = useState(dateUtil.getDay(props.date));
  const [monthTo, setMonthTo] = useState(dateUtil.getMonth(props.date));
  const [yearTo, setYearTo] = useState(dateUtil.getYear(props.date));

  useEffect(() => {
    function setInitialState(date) {
      setDayFrom(dateUtil.getYear(date));
      setMonthFrom(dateUtil.getMonth(date));
      setDayFrom(dateUtil.getDay(date));
    };

    async function getData() {
      const oneWeekAgo = dateUtil.getWeeksAgo(props.date, { n: 1 });
      setInitialState(oneWeekAgo);
      const response = await WeightService.getAllWeights(
        `${dateUtil.getYear(oneWeekAgo)}/${dateUtil.getMonth(oneWeekAgo)}/${dateUtil.getDay(oneWeekAgo)}`,
        `${dateUtil.getYear(props.date)}/${dateUtil.getMonth(props.date)}/${dateUtil.getDay(props.date)}`
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
        borderColor: "#6bd486",
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