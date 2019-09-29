import React from 'react';

import Routes from './routes/index'
import RootStore from "./store";
import MAudio from './components/m-audio/MAudio'
import MPlayer from './components/m-player/MPlayer'
import MErrorBoundary from "./components/m-error-bundary/MErrorBoundary"

const App: React.FC = () => {
  return (
    <MErrorBoundary>
      <RootStore>
        <MAudio />
        <Routes>
          <MPlayer />
        </Routes>
      </RootStore>
    </MErrorBoundary>
  );
};

export default App;
