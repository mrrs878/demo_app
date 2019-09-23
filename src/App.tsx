import React from 'react';

import Routes from './routes/index'
import RootStore from "./store";

const App: React.FC = () => {
  return (
    <RootStore>
      <Routes />
    </RootStore>
  );
};

export default App;
