import React from 'react';
import { Line } from 'react-chartjs-2';

const CustomLine = (props) => {
  console.log(props.data);
  return (
    <Line data={props.data}/>
  );
};

export default CustomLine;