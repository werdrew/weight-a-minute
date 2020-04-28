import React, { useState, useEffect } from 'react';
import CardWithTabs from './CardWithTabs/CardWithTabs';
import HomeTab from './Tabs/HomeTab';
import StatisticsTab from './Tabs/StatisticsTab';

const Main = (props) => {
  /* Props */
  const { date } = props;

  const tabs = [
    {
      title: 'Home',
      body: <HomeTab date={date}/>
    },
    {
      title: 'Statistics',
      body: <StatisticsTab date={date}/>
    }
  ]  

  return (
    <CardWithTabs
      tabs={tabs}/>
  );
};

export default Main;