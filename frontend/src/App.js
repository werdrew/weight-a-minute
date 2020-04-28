import React from 'react';
import Main from './components/Main';
import Logo from './components/Logo';
import { Container, Row, Col } from 'reactstrap';

const today = new Date();
const logoPath = "/logo_web.png";

export default function App() {
  return (
    <Container className="App">
      <Row className="justify-content-center">
        <Logo path={logoPath}/>
        <Main
          date={today}/>
      </Row>
    </Container>
  );
};