import React from 'react';
import {
  Row
} from 'reactstrap';
import Line from '../DataViz/Line'
import RangeSelector from '../Date/RangeSelector';

const VisualizeTab = (props) =>
  <>
    <Row className="justify-content-center">
      <RangeSelector
        fromDate={props.fromDate}
        toDate={props.toDate}
        onChangeFromDay={props.onChangeFromDay}
        onChangeFromMonth={props.onChangeFromMonth}
        onChangeFromYear={props.onChangeFromYear}
        onChangeToDay={props.onChangeToDay}
        onChangeToMonth={props.onChangeToMonth}
        onChangeToYear={props.onChangeToYear}/>
    </Row>
    <Row>
      <Line
        data={props.lineGraphData}/>
    </Row>
  </>

export default VisualizeTab;