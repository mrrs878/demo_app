import React, { useState, useEffect, useRef } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
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
  id: number
  url: string
  type: string
  size: number
  level: string

  constructor(id = 0, url = '', type = '', size = 0, level = '') {
    this.id = id
    this.url = url
    this.type = type
    this.size = size
    this.level = level
  }
}

const Player: React.FC<IPlayerProps> = props => {
  const [ songId, setSongId ] = useState('')
  const [ song, setSong ] = useState<Array<ISong>>([])
  const [ picRoatDeg, setPicRoatDeg ] = useState(0)
  const [ playerStatus, setPlayerStatus ] = useState(false)
  const [ playTime, setPlayTime ] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSongId(props.match.params.id)
  })
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
  }, [ songId ])

  function toggleAudioStatus() {
    if(audioRef.current) {
      if(!playerStatus) {
        audioRef.current.play()
        audioRef.current.addEventListener('timeupdate', (e) => {
          let tmp = e as any
          // console.log(e.target && e.target.currentTime);
          console.log(Math.ceil(tmp.target.currentTime));
          setPlayTime(Math.ceil(tmp.target.currentTime))
        })
      }
      else audioRef.current.pause()
    }
    setPlayerStatus(!playerStatus)
  }

  function formatPlayTime(time: number) {
    return `${Math.floor(time / 60)}:${time % 60}`
  }

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="#00000000" titleColor="#666" titlePosition="center"></MHeader>
      <div className={ playerStyle.bg }></div>
      <div className={ playerStyle.playerContainer }>
        <audio ref={ audioRef } src={ `http://m10.music.126.net/20190921224050/68de18664f300305a9d8a42481181f0e/ymusic/693f/bed1/456d/e58d3babaa101a57876c4b59945dd274.mp3` }></audio>
        <div className={ playerStyle.pic } style={{ transform: `rotate(${picRoatDeg}deg)`, animationPlayState: playerStatus ? 'running' : 'paused' }}></div>
        <div className={ playerStyle.controlContainer }>
          <div className={ playerStyle.timeLineContainer }>
            <div ref={ timeLineRef } className={ `${playerStyle.timeLine}` } style={{ animationDuration: '233s',  animationPlayState: playerStatus ? 'running' : 'paused' }}></div>
          </div>
          <p className={ playerStyle.playTime }>{ formatPlayTime(playTime) }</p>
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
}

export default withRouter(Player)
