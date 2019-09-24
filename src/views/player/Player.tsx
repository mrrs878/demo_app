import React, {useState, useEffect, useRef, useContext} from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline  from '../../components/m-timeline/MTimeline'
import PlayList from '../../components/play-list/PlayList'
import { getSongURL } from '../../apis/api'
import { IGetSongURL } from '../../apis/apiParams'
import { AxiosResponse } from 'axios'
import { ISongRes } from '../../interfaces/ajaxRes'
import { IPlayer } from '../../interfaces'
import { Player } from '../../store/model'
import { RootContext } from '../../store'

//@ts-ignore
import playerStyle from './player.module.less'

interface IPlayerProps extends RouteComponentProps<IGetSongURL> {}

const PlayerCom: React.FC<IPlayerProps> = props => {
  const [ player, setPlayer ] = useState<IPlayer>(new Player());
  const [ playerStatus, setPlayerStatus ] = useState(false);
  const [ playTime, setPlayTime ] = useState(0);
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { state } = useContext(RootContext);

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
        setPlayerStatus(false)
      };
    }
  });

  function toggleAudioStatus() {
    if(audioRef.current) {
      if(!playerStatus) audioRef.current.play();
      else audioRef.current.pause();
      setPlayerStatus(!playerStatus)
    }
  }

  function adjustAnimation(time: number) {
    if(audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
      setPlayTime(Math.floor(time));
      setPlayerStatus(true)
    }
  }

  function formatPlayTime(time: number) {
    time = isNaN(time) ? 0 : time;
    let min = Math.floor( time / 60);
    let sec = Math.floor( time % 60);
    return `${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  function handleTimelineRef(ref: any) {}

  function togglePlayList() {
    setPlayList_f(1)
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="#00000000" titleColor="#666" titlePosition="center"/>
      <div className={playerStyle.bg} style={{ backgroundImage: `url(${ player.picUrl })` }}/>
      <div className={ playerStyle.playerContainer }>
        <audio ref={audioRef} src={ player.url }/>
        {/*<audio ref={audioRef} src="http://m7.music.126.net/20190924115409/a3f65aa376eece96069926dafa28bf80/ymusic/d9ee/21c2/4fae/cb8b79ebc773ae858bb7f31a3e286261.flac"/>*/}
        <div className={playerStyle.pic} style={{
          animationTimingFunction: '',
          animationPlayState: playerStatus ? 'running' : 'paused',
          backgroundImage: `url(${ player.picUrl })`
        }}/>
        <div className={ playerStyle.controlContainer }>
          <MTimeline status={ playerStatus } onRef={ handleTimelineRef } duration={248 * 1000} lineColor={'#f00'} adjust={ adjustAnimation } />
          <div className={ playerStyle.playTime }>
            <p>{ formatPlayTime(playTime) }</p>
            <p>{ formatPlayTime( audioRef.current ? audioRef.current.duration : 0) }</p>
          </div>
          <div className={ playerStyle.control }>
            <MIcon name="icon-playAll" color="#666" size={40} />
            <MIcon name="icon-previousAudio" color="#666" size={40} />
            <MIcon name={ playerStatus ? 'icon-pauseAudio' : 'icon-startAudio' } color="#666" size={40} onClick={ toggleAudioStatus } />
            <MIcon name="icon-nextAudio" color="#666" size={40} />
            <MIcon name="icon-audioList" color="#666" size={40} onClick={ togglePlayList } />
          </div>
        </div>
        <PlayList zIndex={ playList_f } list={ state.playList }/>
      </div>
    </div>
  )
};

export default withRouter(PlayerCom)
