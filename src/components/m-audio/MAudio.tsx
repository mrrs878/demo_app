import React, {Fragment, SyntheticEvent, useContext, useEffect, useRef, useState} from "react"

import { ActivityIndicator  } from 'antd-mobile'
import { types, RootContext } from "../../store"
import {getSongURL} from "../../apis/api"
import {AxiosResponse} from "axios"
import {ISongRes} from "../../interfaces/ajaxRes"

interface IMAudioProps {}

const MAudio: React.FC<IMAudioProps> = props => {
  const [ ready, setReady ] = useState<boolean>(false);
  const { state, dispatch } = useContext(RootContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(audioRef.current) {
      if(state.player.status) audioRef.current.play();
      else audioRef.current.pause()
    }
  }, [ state.player.status ]);
  useEffect(() => {
    if(state.playList.length > 0) {
      setReady(true);
      getSongURL({ id: state.playList[state.playingIndex].id.toString() }).then((res: AxiosResponse<ISongRes>) => {
        //@ts-ignore
        dispatch({ type: types.SET_PLAYER, data: res.data.data[0] })
      }).catch(e =>
        console.log(e)
      )
    }
  }, [ state.playingIndex ]);
  useEffect(() =>{
    if(audioRef.current && !isNaN(state.playingTime)) audioRef.current.currentTime = state.playingTime
  }, [ state.playingTime ]);
  useEffect(() => {
    // if(!ready)
  }, [ ready ]);

  function handleAudioTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { currentTime: e.currentTarget.currentTime }})
  }
  function handleAudioEnded() {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { status: false }})
  }
  function handleAudioCanPlay(e: SyntheticEvent<HTMLAudioElement, Event>) {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { duration: e.currentTarget.duration }})
  }
  function handleAudioPlay() {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER , data: { status: true }})
    setReady(false);
  }

  return (
    <Fragment>
      <ActivityIndicator animating={ ready } toast text="加载歌曲中..."/>
      <audio ref={ audioRef } src={ state.player.url } autoPlay={true} onPlay={ handleAudioPlay } onCanPlay={ handleAudioCanPlay } onTimeUpdate={ handleAudioTimeUpdate } onEnded={ handleAudioEnded }/>
    </Fragment>
  )
};

export default MAudio;
