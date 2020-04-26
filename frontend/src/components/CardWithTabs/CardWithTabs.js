import React, { useState } from 'react';
import {
  Card, CardBody, CardText,
  Container, Nav, NavItem,
  NavLink, Row, TabContent,
  TabPane
} from 'reactstrap';

const CardWithTabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const tabs = [];
  const panes = [];
  props.tabs.forEach((tab, index) => {
    tabs.push(
      <NavItem>
        <NavLink
          className={activeTab === index ? 'active' : ''}
          onClick={() => toggle(index)}>
          {tab.title}
        </NavLink>
      </NavItem>
    );

    panes.push(
      <TabPane tabId={index}>
        <Row>
          <CardText className="p-3">
            {tab.body}
          </CardText>
        </Row>
      </TabPane>
    );
  });

  return (
    <Container id="Main">
      <Row className="justify-content-center">
        <Card className="shadow">
          <CardBody>
            <Nav tabs>
              {tabs}
            </Nav>
            <TabContent activeTab={activeTab}>
              {panes}
            </TabContent>
          </CardBody>
        </Card>
      </Row>
    </Container>
  )
}

export default CardWithTabs;