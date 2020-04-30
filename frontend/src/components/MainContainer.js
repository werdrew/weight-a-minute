import React from 'react';
import HomeTabContainer from './Tabs/HomeTabContainer';
import VisualizeTabContainer from './Tabs/VisualizeTabContainer';
import Main from './Main';

const MainContainer = (props) => {
  const tabs = [
    {
      title: 'Home',
      body: <HomeTabContainer 
        date={props.date}/>
    },
    {
      title: 'Visualize',
      body: <VisualizeTabContainer 
        date={props.date}/>
    }
  ]

  return (
    <Main
      tabs={tabs}/>
  );
};

export default MainContainer;