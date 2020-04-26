import React from 'react';
import CardWithTabs from './CardWithTabs/CardWithTabs';

const tabs = [
  {
    title: 'Enter weight',
    body: <React.Fragment>
      Enter weight placeholder.
    </React.Fragment>
  },
  {
    title: 'Statistics',
    body: <React.Fragment>
      Statistics placeholder.
    </React.Fragment>
  }
]

const Main = (props) => {
  return (
    <CardWithTabs
      tabs={tabs}/>
  );
};

export default Main;