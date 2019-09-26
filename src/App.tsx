import React from 'react';

import Routes from './routes/index'
import RootStore from "./store";
import MAudio from './components/m-audio/MAudio'
import Footer from './components/footer/Footer'

const App: React.FC = () => {
  return (
    <RootStore>
      <MAudio />
      <Routes />
      <Footer />
    </RootStore>
  );
};

export default App;
