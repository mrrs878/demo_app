import React, {useContext, useState, useEffect} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline from '../../components/m-timeline/MTimeline'
import MLyric from "../../components/m-lyric/MLyric"
import PlayList from '../../components/play-list/PlayList'
import { IGetSongURL } from '../../apis/apiParams'
import {getLyric} from "../../apis/api";
import {PlayMode} from '../../constant'
import { RootContext, types} from '../../store'
//@ts-ignore
import playerStyle from './player.module.less'
import {AxiosResponse} from "axios";
import {ILyricRes} from "../../interfaces/ajaxRes";

interface IPlayerProps extends RouteComponentProps<IGetSongURL> {}

const PlayerCom: React.FC<IPlayerProps> = props => {
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  const [ lyric, setLyric ] = useState<string>('');
  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    getLyric({ id: state.song.id.toString() }).then((res: AxiosResponse<ILyricRes>) => {
      setLyric(res.data.lrc.lyric)
    }).catch(e => console.log(e))
  }, [ state.song.id ]);

  function toggleAudioStatus() {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: !state.player.status } });
  }

  function adjustAnimation(time: number) {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYING_TIME, data: time * state.player.duration });
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: true }});
  }

  function formatPlayTime(time: number) {
    time = isNaN(time) ? 0 : time;
    let min = Math.floor( time / 60);
    let sec = Math.floor( time % 60);
    return `${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  function handleTimelineRef(ref: any) {}

  function handleTogglePlayList() {
    setPlayList_f(1)
  }
  function handleTogglePlayMode() {
    let newMode = PlayMode.onByOne;
    newMode = state.player.mode === PlayMode.onByOne ? PlayMode.circleOne : PlayMode.onByOne;
    Toast.info(state.player.mode === PlayMode.onByOne ? '单曲循环' : '顺序播放', 1);
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { mode: newMode } })
  }
  function handleToggleSong(direction: boolean) {
    if(!direction) {
      if(state.playingIndex === 0) {
        Toast.info("当前已是第一首歌曲");
        return;
      }
      //@ts-ignore
      dispatch({ type: types.SET_SONG, data: state.playList.tracks[state.playingIndex - 1] });
      //@ts-ignore
      dispatch({ type: types.SET_PLAYING_INDEX, data: state.playingIndex - 1 });
    } else {
      if(state.playingIndex === state.playList.length - 1) {
        Toast.info("当前已是最后一首歌曲");
        return;
      }
      //@ts-ignore
      dispatch({ type: types.SET_SONG, data: state.playList.tracks[state.playingIndex + 1] });
      //@ts-ignore
      dispatch({ type: types.SET_PLAYING_INDEX, data: state.playingIndex + 1 });
    }
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="rgba(0, 0, 0, 0)" titleColor="#666" titlePosition="center">{ state.song.name }</MHeader>
      <div className={playerStyle.bg} style={{ backgroundImage: `url(${ state.song.al.picUrl })` }}/>
      <br/>
      <div className={ playerStyle.playerContainer }>
        <div className={playerStyle.pic} style={{
          animationTimingFunction: '',
          animationPlayState: state.player.status ? 'running' : 'paused',
          backgroundImage: `url(${ state.song.al.picUrl })`
        }}/>
        <br/>
        <MLyric currentTime={ state.player.currentTime } lyric={ lyric }/>
        <div className={ playerStyle.controlContainer }>
          <MTimeline status={ state.player.status } onRef={ handleTimelineRef } process={ state.player.currentTime / (state.player.duration ? state.player.duration : 1) * 100 } lineColor={'#f00'} adjust={ adjustAnimation } />
          <div className={ playerStyle.playTime }>
            <p>{ formatPlayTime(state.player.currentTime) }</p>
            <p>{ formatPlayTime( state.player.duration) }</p>
          </div>
          <div className={ playerStyle.control }>
            <MIcon name={ state.player.mode } color="#666" size={40} onClick={ handleTogglePlayMode } />
            <MIcon name="icon-previousAudio" color="#666" size={40} onClick={ () => handleToggleSong(false) } />
            <MIcon name={ state.player.status ? 'icon-pauseAudio' : 'icon-startAudio' } color="#666" size={40} onClick={ toggleAudioStatus } />
            <MIcon name="icon-nextAudio" color="#666" size={40} onClick={ () => handleToggleSong(true) } />
            <MIcon name="icon-audioList" color="#666" size={40} onClick={ handleTogglePlayList } />
          </div>
        </div>
        <PlayList zIndex={ playList_f } onClose={() => setPlayList_f(-1)}/>
      </div>
    </div>
  )
};

export default withRouter(PlayerCom)
