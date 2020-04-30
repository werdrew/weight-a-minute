import React from 'react';
import Main from './components/Main';
import Logo from './components/Logo';
import { Container, Row } from 'reactstrap';

const today = new Date();
const logoPath = "/logo_web.png";

export default function App() {
  return (    
    <Container fluid className="App p-0 full-width justify-content-center top">
      <Row className="">
        <Logo path={logoPath}/>
      </Row>
      <Row>
        <Main
          date={today}/>
      </Row>
    </Container>
  );
};