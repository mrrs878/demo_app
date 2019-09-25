import React, { useRef, useContext } from 'react';

import Routes from './routes/index'
import RootStore, {RootContext} from "./store";

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { state } = useContext(RootContext);

  return (
    <RootStore>
      <audio ref={audioRef} src={ state.playerUrl }/>
      <Routes />
    </RootStore>
  );
};

export default App;
