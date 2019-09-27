import React from 'react';

import Routes from './routes/index'
import RootStore from "./store";
import MAudio from './components/m-audio/MAudio'
import MPlayer from './components/m-player/MPlayer'

const App: React.FC = () => {
  return (
    <RootStore>
      <MAudio />
      <Routes>
        <MPlayer />
      </Routes>
    </RootStore>
  );
};

export default App;
