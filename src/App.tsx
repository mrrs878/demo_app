import React from 'react';

import Routes from './routes/index'
import RootStore from "./store";
import MAudio from './components/m-audio/MAudio'

const App: React.FC = () => {
  return (
    <RootStore>
      <MAudio />
      <Routes />
    </RootStore>
  );
};

export default App;
