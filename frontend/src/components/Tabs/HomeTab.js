import React, { useState, useEffect } from 'react';
import {
  Button, Col, Form,
  FormGroup, Input, Label, Row
} from 'reactstrap';
import DateSelector from '../Date/DateSelector';
import dateUtil from '../Date/dateUtil';
import WeightService from '../../service/WeightService';

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

const HomeTab = (props) => {
    /* State */
    const [day, setDay] = useState(dateUtil.getDay(props.date));
    const [month, setMonth] = useState(dateUtil.getMonth(props.date));
    const [year, setYear] = useState(dateUtil.getYear(props.date));
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

  const onDelete = async ({ year, month, day, weight }) => {
    const response = await WeightService.deleteWeight(year, month, day, weight);
    const code = response.code;
    if (code) handleError(code, setMsg);
    else {
      setMsg('Success!');
      setWeight(-1);
    }
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
  const homeForm =
    <Form>
      <FormGroup>
        <Input 
          id="weight"
          value={weight === -1 ? '' : weight}
          onChange={e => setWeight(e.target.value)}
          valid={isValidWeight(weight)}
          invalid={!isValidWeight(weight)}/>
      </FormGroup>
    </Form>
    
  return (
    <Col>
      <DateSelector
        label='Enter weight for:'
        date={props.date}
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
          color="warning"
          disabled={!isValidWeight(weight)}
          onClick={() => onUpdate({ year, month, day, weight })}>
            Update
        </Button>
        <Button 
          color="danger"
          onClick={() => onDelete({ year, month, day, weight })}>
            Delete
        </Button>
      </Row>
    </Col>
  )
};

export default HomeTab;