import React from 'react';
import {
  Button, Input, Row
} from 'reactstrap';
import DateSelectorContainer from '../Date/DateSelectorContainer';

const HomeTab = (props) =>
    <>
      <Row className="justify-content-center tab-pane-row tab-pane-top-row">
        <DateSelectorContainer
          label='Enter weight for:'
          date={props.date}
          onChangeDay={props.onChangeDay}
          onChangeMonth={props.onChangeMonth}
          onChangeYear={props.onChangeYear}/>
      </Row>
      <Row className="justify-content-center tab-pane-row">
        <Input 
            id="weight"
            value={props.weight === -1 ? '' : props.weight}
            onChange={props.onChangeInput}
            valid={props.valid}
            invalid={!props.valid}/>
      </Row>
      <Row className="justify-content-center tab-pane-row">
        {props.msg && <p className={props.msg === 'Success!' ? 'successMsg' : 'errorMsg'}>{props.msg}</p>}
      </Row>
      <Row className='btn-row justify-content-center tab-pane-row'>
        <Button 
          color="primary"
          disabled={!props.valid}
          onClick={() => props.onSubmit({ 
            year: props.year, 
            month: props.month, 
            day: props.day, 
            weight: props.weight 
          })}>
            Submit
        </Button>
        <Button 
          color="warning"
          disabled={!props.valid}
          onClick={() => props.onUpdate({ 
            year: props.year, 
            month: props.month, 
            day: props.day, 
            weight: props.weight 
           })}>
            Update
        </Button>
        <Button 
          color="danger"
          onClick={() => props.onDelete({ 
            year: props.year, 
            month: props.month, 
            day: props.day, 
            weight: props.weight 
          })}>
            Delete
        </Button>
      </Row>
    </>

export default HomeTab;