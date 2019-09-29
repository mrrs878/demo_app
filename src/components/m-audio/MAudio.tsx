import React, {Fragment, SyntheticEvent, useContext, useEffect, useRef, useState} from "react"

import {ActivityIndicator} from 'antd-mobile'
import {RootContext, types} from "../../store"
import {getSongURL} from "../../apis/api"
import {AxiosResponse} from "axios"
import {ISongRes} from "../../interfaces/ajaxRes"
import {EPlayMode} from "../../constant";

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
        dispatch({ type: types.SET_PLAYER, data: res.data.data[0] })
      }).catch(e =>
        console.log(e)
      )
    }
  }, [ state.playingIndex ]);
  useEffect(() =>{
    if(audioRef.current && !isNaN(state.playingTime)) audioRef.current.currentTime = state.playingTime
  }, [ state.playingTime ]);

  function handleAudioTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
    dispatch({ type: types.SET_PLAYER , data: { currentTime: e.currentTarget.currentTime }})
  }
  function handleAudioEnded() {
    dispatch({ type: types.SET_PLAYER , data: { status: false }});

    if(state.player.mode === EPlayMode.onByOne) {
      if(dispatch) {
        let index = state.playingIndex;
        if(index === state.playingIndex - 1) return;
        dispatch({ type: types.SET_PLAYING_INDEX, data: index + 1 });
        dispatch({ type: types.SET_SONG, data: state.playList[index + 1] });
        dispatch({ type: types.SET_PLAYER , data: { status: true }});
      }
    }
  }
  function handleAudioCanPlay(e: SyntheticEvent<HTMLAudioElement, Event>) {
    dispatch({ type: types.SET_PLAYER , data: { duration: e.currentTarget.duration }})
  }
  function handleAudioPlay() {
    dispatch({ type: types.SET_PLAYER , data: { status: true }})
    setReady(false);
  }

  return (
    <Fragment>
      <ActivityIndicator animating={ ready } toast text="加载歌曲中..."/>
      <audio ref={ audioRef } src={ state.player.url } loop={ state.player.mode === EPlayMode.circleOne } autoPlay={true} onPlay={ handleAudioPlay } onCanPlay={ handleAudioCanPlay } onTimeUpdate={ handleAudioTimeUpdate } onEnded={ handleAudioEnded }/>
    </Fragment>
  )
};

export default MAudio;
