/* TODO: Month should always be index, not the string for API */

import React, { useState, useEffect } from 'react';
import { 
  Button, Col, Form, 
  FormGroup, Input, Label, Row 
} from 'reactstrap';
import CardWithTabs from './CardWithTabs/CardWithTabs';
import DateSelector from './Date/DateSelector';
import dateUtil from './Date/dateUtil';
import WeightService from '../service/WeightService';

const constructDate = ({ day, month, year }) => new Date(`${month} ${day}, ${year}`);

const isValidWeight = weight => /^\d+(\.\d+)?$/.test(weight);

const handleError = (code, setMsg) => {
  if (code === 'SQLITE_CONSTRAINT') {
    setMsg('Error: A weight has already been submitted for this date. Please update instead of submitting.');
  }
  else {
    setMsg('Error: Previously unencountered error: ' + code);
  }
}

const Main = (props) => {
  /* Props */
  const { date } = props;

  /* State */
  const [day, setDay] = useState(dateUtil.getDay(date));
  const [month, setMonth] = useState(dateUtil.getMonth(date));
  const [year, setYear] = useState(dateUtil.getYear(date));
  const [weight, setWeight] = useState(-1);
  const [msg, setMsg] = useState('');


  /* Other hooks */
  useEffect(() => {
    function setState(response) {
      setWeight(response.data.weight);
      setMsg('');
    }

    async function getWeight() {
      try {
        const response = await WeightService.getWeight(year, month, day);
        setState(response);
      } catch (error) {
        console.error(error);
      }
    }

    getWeight();
  }, [year, month, day]);

  /* Change handlers */
  const onSubmit = async ({ year, month, day, weight }) => {
    const response = await WeightService.addWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else setMsg('Success!');
  };

  const onUpdate = async ({ year, month, day, weight }) => {
    const response = await WeightService.updateWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else setMsg('Success!');
  };

  const onChangeDay = (e) => {
    setWeight(-1);
    setDay(e);
  };

  const onChangeMonth = (e) => {
    setWeight(-1);
    const monthNum = dateUtil.getMonthAsNum(e);
    setMonth(monthNum);
  }

  const onChangeYear = (e) => {
    setWeight(-1);
    setYear(e);
  }

  /* Render */
  const formText = `Enter weight for ${ dateUtil.formatAsString(constructDate({ day, month, year })) }.`;

  const homeForm =
    <Form>
      <FormGroup>
        <Label for="weight">{formText}</Label>
        <Input 
          id="weight"
          value={weight === -1 ? '' : weight}
          onChange={e => setWeight(e.target.value)}
          valid={isValidWeight(weight)}
          invalid={!isValidWeight(weight)}/>
      </FormGroup>
    </Form>

  const tabs = [
    {
      title: 'Home',
      body: <Col>
        <DateSelector
          date={date}
          onChangeDay={onChangeDay}
          onChangeMonth={onChangeMonth}
          onChangeYear={onChangeYear}/>
        {homeForm}
        {msg && <p className={msg === 'Success!' ? 'successMsg' : 'errorMsg'}>{msg}</p>}
        <Row className='btn-row justify-content-center'>
          <Button 
            color="primary"
            disabled={!isValidWeight(weight)}
            onClick={() => onSubmit({ year, month, day, weight })}>
              Submit
          </Button>
          <Button 
            color="primary"
            disabled={!isValidWeight(weight)}
            onClick={() => onUpdate({ year, month, day, weight })}>
              Update
          </Button>
        </Row>
      </Col>
    },
    {
      title: 'Statistics',
      body: <Col>
        Statistics placeholder.
      </Col>
    }
  ]  

  return (
    <CardWithTabs
      tabs={tabs}/>
  );
};

export default Main;