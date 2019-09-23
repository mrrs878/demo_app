import React, {useState, useEffect, useRef, RefObject} from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline from '../../components/m-timeline/MTimeline'
import { getSongURL } from '../../apis/api'
import { AxiosResponse } from 'axios'
import { ISongRes } from '../../interfaces/ajaxRes'
import { ISong } from '../../interfaces/index'

//@ts-ignore
import playerStyle from './player.module.less'

interface IRouteParam {
  id: string
}

interface IPlayerProps extends RouteComponentProps<IRouteParam> {}

class Song implements ISong {
  id: number;
  url: string;
  type: string;
  size: number;
  level: string;

  constructor(id = 0, url = '', type = '', size = 0, level = '') {
    this.id = id;
    this.url = url;
    this.type = type;
    this.size = size;
    this.level = level
  }
}

const Player: React.FC<IPlayerProps> = props => {
  const [ songId, setSongId ] = useState('');
  const [ song, setSong ] = useState<Array<ISong>>([]);
  const [ picRoatDeg, setPicRoatDeg ] = useState(0);
  const [ playerStatus, setPlayerStatus ] = useState(false);
  const [ playTime, setPlayTime ] = useState(0);
  const [ timelineRef, setTimelineRef ] = useState<HTMLDivElement>()
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSongId(props.match.params.id)
  });
  // useEffect(() => {
  //   let intervalId = setInterval(() => {
  //     setPicRoatDeg(picRoatDeg === 360 ? 0 : picRoatDeg+1)
  //   }, 20)
  //   return () => clearInterval(intervalId)
  // })
  useEffect(() => {
    if(songId) {
      // getSongURL({ id: songId }).then((e: AxiosResponse<ISongRes>) => {
      //   setSong(e.data.data)
      // }).catch(e =>
      //   console.log(e)
      // )
    }
  }, [ songId ]);
  useEffect(() => {
    if(audioRef.current && timelineRef) {
      audioRef.current.addEventListener('timeupdate', e => {
        let tmp = e as any;
        setPlayTime(Math.ceil(tmp.target.currentTime))
        // console.log(timelineRef)
      });
      audioRef.current.addEventListener('ended', e => {
        setPlayerStatus(false)
      })
    }
  }, [ audioRef.current ]);

  function toggleAudioStatus() {
    if(audioRef.current) {
      if(!playerStatus) {
        audioRef.current.play();
        // animation.playAnimation()
      }
      else {
        audioRef.current.pause();
        pauseAnimation();
      }
      setPlayerStatus(!playerStatus)
    }
  }

  function playAnimation() {}
  function pauseAnimation() {}
  function resetAnimation() {}
  function adjustAnimation(time: number) {
    if(audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
      setPlayTime(Math.floor(time))
      setPlayerStatus(true)
    }
  }

  function formatPlayTime(time: number) {
    return `${Math.floor(time / 60)}:${time % 60}`
  }

  function handleTimelineRef(ref: RefObject<HTMLDivElement>) {
    setTimelineRef(ref.current || undefined)
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="#00000000" titleColor="#666" titlePosition="center"/>
      <div className={playerStyle.bg}/>
      <div className={ playerStyle.playerContainer }>
        <audio ref={audioRef} src={`http://m10.music.126.net/20190921224050/68de18664f300305a9d8a42481181f0e/ymusic/693f/bed1/456d/e58d3babaa101a57876c4b59945dd274.mp3`}/>
        <div className={playerStyle.pic} style={{
          transform: `rotate(${picRoatDeg}deg)`,
          animationTimingFunction: '',
          animationPlayState: playerStatus ? 'running' : 'paused'
        }}/>
        <div className={ playerStyle.controlContainer }>
          <MTimeline onRef={ handleTimelineRef } duration={248 * 1000} lineColor={'#f00'} pause={ pauseAnimation } play={ playAnimation } reset={ resetAnimation } adjust={ adjustAnimation } />
          <div className={ playerStyle.playTime }>
            <p>{ formatPlayTime(playTime) }</p>
            <p>{ formatPlayTime(248) }</p>
          </div>
          <div className={ playerStyle.control }>
            <MIcon name="icon-playAll" color="#666" size={40} />
            <MIcon name="icon-previousAudio" color="#666" size={40} />
            <MIcon name={ playerStatus ? 'icon-pauseAudio' : 'icon-startAudio' } color="#666" size={40} onClick={ toggleAudioStatus } />
            <MIcon name="icon-nextAudio" color="#666" size={40} />
            <MIcon name="icon-audioList" color="#666" size={40} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default withRouter(Player)
