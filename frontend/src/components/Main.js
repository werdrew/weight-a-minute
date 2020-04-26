import React, { useState } from 'react';
import { Button, Row } from 'reactstrap';
import CardWithTabs from './CardWithTabs/CardWithTabs';
import DateSelector from './Date/DateSelector';
import dateUtil from './Date/dateUtil';

const Main = (props) => {
  const { date } = props;

  const [day, setDay] = useState(dateUtil.getDay(date));
  const [month, setMonth] = useState(dateUtil.getMonth(date));
  const [year, setYear] = useState(dateUtil.getYear(date));

  const tabs = [
    {
      title: 'Home',
      body: <React.Fragment>
        <DateSelector
          date={date}
          onChangeDay={setDay}
          onChangeMonth={setMonth}
          onChangeYear={setYear}/>
        <Row className='btn-row justify-content-center'>
          <Button>Submit</Button>
          <Button>Update</Button>
        </Row>
      </React.Fragment>
    },
    {
      title: 'Statistics',
      body: <React.Fragment>
        Statistics placeholder.
      </React.Fragment>
    }
  ]  

  return (
    <CardWithTabs
      tabs={tabs}/>
  );
};

export default Main;