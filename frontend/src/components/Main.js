import React from 'react';
import CardWithTabs from './CardWithTabs/CardWithTabs';
import HomeTab from './Tabs/HomeTab';
import VisualizeTab from './Tabs/VisualizeTab';

const Main = (props) => {
  /* Props */
  const { date } = props;

  const tabs = [
    {
      title: 'Home',
      body: <HomeTab 
        date={date}/>
    },
    {
      title: 'Visualize',
      body: <VisualizeTab 
        date={date}/>
    }
  ]  

  return (
    <CardWithTabs
      tabs={tabs}/>
  );
};

export default Main;