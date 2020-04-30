import React from 'react';
import {
  Card, CardBody, Container, 
  Nav, Row, TabContent
} from 'reactstrap';

const CardWithTabs = (props) =>
  <Container id="Main">
    <Row className="justify-content-center">
      <Card className="shadow">
        <CardBody>
          <Nav tabs>
            {props.tabs}
          </Nav>
          <TabContent activeTab={props.activeTab}>
            {props.panes}
          </TabContent>
        </CardBody>
      </Card>
    </Row>
  </Container>

export default CardWithTabs;