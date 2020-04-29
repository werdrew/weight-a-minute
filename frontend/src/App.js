import React from 'react';
import Main from './components/Main';
import Logo from './components/Logo';
import { Container, Row } from 'reactstrap';

const today = new Date();
const logoPath = "/logo_web.png";

export default function App() {
  return (    
    <Container fluid className="App p-0">
      <div className="full-width top">
        <Row className="justify-content-center">
          <Logo path={logoPath}/>
          <Main
            date={today}/>
        </Row>
      </div>
      <div className="full-width bottom"></div>
    </Container>
  );
};