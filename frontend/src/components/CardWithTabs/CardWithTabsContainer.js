import React, { useState } from 'react';
import {
  NavLink, Row, NavItem, TabPane
} from 'reactstrap';
import CardWithTabs from './CardWithTabs';

const CardWithTabsContainer = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const tabs = [];
  const panes = [];
  props.tabs.forEach((tab, index) => {
    tabs.push(
      <NavItem key={`${tab}-${index}-nav-item`}>
        <NavLink
          className={activeTab === index ? 'active' : ''}
          onClick={() => toggle(index)}
          key={tab}>
          {tab.title}
        </NavLink>
      </NavItem>
    );

    panes.push(
      <TabPane tabId={index} key={`${tab}-${index}-tab-pane`}>
        <Row className="justify-content-center">
          { activeTab === index ? tab.body : null }
        </Row>
      </TabPane>
    );
  });

  return (
    <CardWithTabs
      tabs={tabs}
      panes={panes}
      activeTab={activeTab}/>
  );
};

export default CardWithTabsContainer;