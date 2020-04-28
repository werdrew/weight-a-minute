import React, { useState, useEffect } from 'react';
import {
  Col
} from 'reactstrap';
import dateUtil from '../Date/dateUtil';
import Line from '../DataViz/Line'
import WeightService from '../../service/WeightService';

const StatisticsTab = (props) => {
  const [data, setData] = useState({});
  const [granularity, setGranularity] = useState('weekly');
  const [msg, setMsg] = useState('Error: Data not loaded...');
  
  useEffect(() => {
    async function getData() {
      const oneWeekAgo = dateUtil.getWeeksAgo(props.date, { n: 1 });
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
      <Line
        data={data}/>
    </Col>
  )
};

export default StatisticsTab;