import React from 'react';
import CardWithTabsContainer from './CardWithTabs/CardWithTabsContainer';
import HomeTabContainer from './Tabs/HomeTabContainer';
import VisualizeTabContainer from './Tabs/VisualizeTabContainer';

const Main = (props) => {
  /* Props */
  const { date } = props;

  console.log(date);

  const tabs = [
    {
      title: 'Home',
      body: <HomeTabContainer 
        date={date}/>
    },
    {
      title: 'Visualize',
      body: <VisualizeTabContainer 
        date={date}/>
    }
  ]  

  return (
    <CardWithTabsContainer
      tabs={tabs}/>
  );
};

export default Main;