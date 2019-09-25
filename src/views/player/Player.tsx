import React, {useContext, useEffect, useRef, useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline from '../../components/m-timeline/MTimeline'
import PlayList from '../../components/play-list/PlayList'
import {getSongURL} from '../../apis/api'
import {IGetSongURL} from '../../apis/apiParams'
import {AxiosResponse} from 'axios'
import {ISongRes} from '../../interfaces/ajaxRes'
import {IPlayer} from '../../interfaces'
import {PlayMode} from '../../constant'
import {models, RootContext, types} from '../../store'
//@ts-ignore
import playerStyle from './player.module.less'
import {SET_PLAY_STATUS} from "../../store/type";

interface IPlayerProps extends RouteComponentProps<IGetSongURL> {}

const PlayerCom: React.FC<IPlayerProps> = props => {
  const [ player, setPlayer ] = useState<IPlayer>(new models.Player());
  const [ playTime, setPlayTime ] = useState(0);
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    getSongURL({ id: props.match.params.id }).then((e: AxiosResponse<ISongRes>) => {
      setPlayer(Object.assign({}, e.data.data[0], { picUrl: state.singer.picUrl }))
    }).catch(e =>
      console.log(e)
    )
  }, [props.match.params, state.singer.picUrl]);
  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.ontimeupdate = (e) => {
        // @ts-ignore
        setPlayTime(Math.ceil(e.target.currentTime))
      };
      audioRef.current.onended = () => {
        //@ts-ignore
        dispatch({ type: SET_PLAY_STATUS, data: false });
      };
    }
  });
  useEffect(() => {
    if(audioRef.current) {
      if(state.playStatus) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [state.playStatus]);

  function toggleAudioStatus() {
    if(audioRef.current) {
      if(!state.playStatus) audioRef.current.play();
      else audioRef.current.pause();
      //@ts-ignore
      dispatch({ type: SET_PLAY_STATUS, data: !state.playStatus });
    }
  }

  function adjustAnimation(time: number) {
    if(audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
      setPlayTime(Math.floor(time));
      //@ts-ignore
      dispatch({ type: SET_PLAY_STATUS, data: true });
    }
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
    dispatch({ type: types.SET_PLAY_MODE, data: newMode })
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="rgba(0, 0, 0, 0)" titleColor="#666" titlePosition="center"/>
      <div className={playerStyle.bg} style={{ backgroundImage: `url(${ player.picUrl })` }}/>
      <div className={ playerStyle.playerContainer }>
        <audio ref={audioRef} src={ player.url }/>
        {/*<audio ref={audioRef} src="http://m8.music.126.net/20190925100255/9bdbcc8d4c1623fcd8b8167edda96896/ymusic/d9ee/21c2/4fae/cb8b79ebc773ae858bb7f31a3e286261.flac"/>*/}
        <div className={playerStyle.pic} style={{
          animationTimingFunction: '',
          animationPlayState: state.playStatus ? 'running' : 'paused',
          backgroundImage: `url(${ player.picUrl })`
        }}/>
        <div className={ playerStyle.controlContainer }>
          <MTimeline status={ state.playStatus } onRef={ handleTimelineRef } duration={ audioRef.current ? audioRef.current.duration : 0 } process={ playTime / (audioRef.current ? audioRef.current.duration : 1) * 100 } lineColor={'#f00'} adjust={ adjustAnimation } />
          <div className={ playerStyle.playTime }>
            <p>{ formatPlayTime(playTime) }</p>
            <p>{ formatPlayTime( audioRef.current ? audioRef.current.duration : 0) }</p>
          </div>
          <div className={ playerStyle.control }>
            <MIcon name={ state.playMode } color="#666" size={40} onClick={ handleTogglePlayMode } />
            <MIcon name="icon-previousAudio" color="#666" size={40} />
            <MIcon name={ state.playStatus ? 'icon-pauseAudio' : 'icon-startAudio' } color="#666" size={40} onClick={ toggleAudioStatus } />
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
