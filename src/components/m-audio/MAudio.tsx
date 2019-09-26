import React, {SyntheticEvent, useContext, useEffect, useRef} from "react"

import { types, RootContext } from "../../store"
import {SET_PLAYER} from "../../store/type";
import {getSongURL} from "../../apis/api";
import {AxiosResponse} from "axios";
import {ISongRes} from "../../interfaces/ajaxRes";

interface IMAudioProps {}

const MAudio: React.FC<IMAudioProps> = props => {
  const { state, dispatch } = useContext(RootContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(audioRef.current) {
      if(state.player.status) audioRef.current.play();
      else audioRef.current.pause()
    }
  }, [ state.player.status ]);
  useEffect(() => {
    if(state.playList.tracks.length > 0) {
      getSongURL({ id: state.playList.tracks[state.playingIndex].id.toString() }).then((res: AxiosResponse<ISongRes>) => {
        //@ts-ignore
        dispatch({ type: types.SET_PLAYER, data: res.data.data[0] })
      }).catch(e =>
        console.log(e)
      )
    }
  }, [ state.playingIndex ]);

  function handleAudioTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { currentTime: e.currentTarget.currentTime, duration: e.currentTarget.duration }})
  }
  function handleAudioEnded() {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { status: false }})
  }

  return (
    <audio ref={ audioRef } src={ state.player.url } onTimeUpdate={ handleAudioTimeUpdate } onEnded={ handleAudioEnded }/>
  )
};

export default MAudio;
