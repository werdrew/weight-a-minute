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

const Main = (props) => {
  /* Props */
  const { date } = props;

  /* State */
  const [day, setDay] = useState(dateUtil.getDay(date));
  const [month, setMonth] = useState(dateUtil.getMonth(date));
  const [year, setYear] = useState(dateUtil.getYear(date));
  const [weight, setWeight] = useState(-1);

  /* Other hooks */
  useEffect(() => {
    async function getWeight() {
      try {
        const response = await WeightService.getWeight(year, month, day);
        console.log(response);
        if (response) {
          setWeight(response.data.weight);
        } else {
          setWeight(-1);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getWeight();
  }, [year, month, day]);

  /* Render */
  const formText = `Enter weight for ${ dateUtil.formatAsString(constructDate({ day, month, year })) }.`;

  const homeForm =
    <Form>
      <FormGroup>
        <Label for="weight">{formText}</Label>
        <Input 
          id="weight" 
          placeholder={weight}
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
          onChangeDay={setDay}
          onChangeMonth={setMonth}
          onChangeYear={setYear}/>
        {homeForm}
        <Row className='btn-row justify-content-center'>
          <Button 
            color="primary"
            disabled={!isValidWeight(weight)}
            onClick={() => WeightService.addWeight(year, month, day, weight)}>
              Submit
          </Button>
          <Button 
            color="primary"
            disabled={!isValidWeight(weight)}
            onClick={() => WeightService.updateWeight(year, month, day, weight)}>
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