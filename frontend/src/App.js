import React from 'react';
import MainContainer from './components/MainContainer';
import Logo from './components/Logo';
import { Container, Row } from 'reactstrap';

const App = (props) =>
  <Container fluid className="App p-0 full-width justify-content-center top">
    <Row>
      <Logo path={props.logoPath}/>
    </Row>
    <Row>
      <MainContainer
        date={props.date}/>
    </Row>
  </Container>

export default App;