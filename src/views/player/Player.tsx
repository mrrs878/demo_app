import React, {useContext, useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline from '../../components/m-timeline/MTimeline'
import PlayList from '../../components/play-list/PlayList'
import {IGetSongURL} from '../../apis/apiParams'
import {PlayMode} from '../../constant'
import { RootContext, types} from '../../store'
//@ts-ignore
import playerStyle from './player.module.less'

interface IPlayerProps extends RouteComponentProps<IGetSongURL> {}

const PlayerCom: React.FC<IPlayerProps> = props => {
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  const { state, dispatch } = useContext(RootContext);

  function toggleAudioStatus() {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: !state.player.status } });
  }

  function adjustAnimation(time: number) {
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: true, currentTime: time * state.player.duration } });
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
    newMode = state.playMode === PlayMode.onByOne ? PlayMode.circleOne : PlayMode.onByOne;
    Toast.info(state.playMode === PlayMode.onByOne ? '单曲循环' : '顺序播放', 1);
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { playMode: newMode } })
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="rgba(0, 0, 0, 0)" titleColor="#666" titlePosition="center"/>
      <div className={playerStyle.bg} style={{ backgroundImage: `url(${ state.player.picUrl })` }}/>
      <div className={ playerStyle.playerContainer }>
        <div className={playerStyle.pic} style={{
          animationTimingFunction: '',
          animationPlayState: state.player.status ? 'running' : 'paused',
          backgroundImage: `url(${ state.player.picUrl })`
        }}/>
        <div className={ playerStyle.controlContainer }>
          <MTimeline status={ state.player.status } onRef={ handleTimelineRef } process={ state.player.currentTime / (state.player.duration ? state.player.duration : 1) * 100 } lineColor={'#f00'} adjust={ adjustAnimation } />
          <div className={ playerStyle.playTime }>
            <p>{ formatPlayTime(state.player.currentTime) }</p>
            <p>{ formatPlayTime( state.player.duration) }</p>
          </div>
          <div className={ playerStyle.control }>
            <MIcon name={ state.playMode } color="#666" size={40} onClick={ handleTogglePlayMode } />
            <MIcon name="icon-previousAudio" color="#666" size={40} />
            <MIcon name={ state.player.status ? 'icon-pauseAudio' : 'icon-startAudio' } color="#666" size={40} onClick={ toggleAudioStatus } />
            <MIcon name="icon-nextAudio" color="#666" size={40} />
            <MIcon name="icon-audioList" color="#666" size={40} onClick={ handleTogglePlayList } />
          </div>
        </div>
        <PlayList zIndex={ playList_f } onClose={() => setPlayList_f(-1)}/>
      </div>
    </div>
  )
};

export default withRouter(PlayerCom)
