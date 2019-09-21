import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import { getSongURL } from '../../config/api'
import { AxiosResponse } from 'axios'

//@ts-ignore
import playerStyle from './player.module.less'

interface IRouteParam {
  id: string
}

interface ISongRes {
  code: number,
  data: Array<ISong>
}
interface ISong {
  id: number,
  url: string,
  type: string,
  size: number,
  leval: string
}

interface IPlayerProps extends RouteComponentProps<IRouteParam> {}

class Song implements ISong {
  id: number
  url: string
  type: string
  size: number
  leval: string

  constructor(id = 0, url = '', type = '', size = 0, leval = '') {
    this.id = id
    this.url = url
    this.type = type
    this.size = size
    this.leval = leval
  }
}

const Player: React.FC<IPlayerProps> = props => {
  const [ songId, setSongId ] = useState('')
  const [ song, setSong ] = useState(new Array<ISong>(new Song()))
  const [ picRoatDeg, setPicRoatDeg ] = useState(0)
  
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

  return (
    <div className={ playerStyle.content }>
      <MHeader bgColor="#00000000" titleColor="#666" titlePosition="center"></MHeader>
      <div className={ playerStyle.bg }></div>
      <div className={ playerStyle.playerContainer }>
        {/* <audio src={ `http://m8.music.126.net/20190921160317/1fd4ec1053a2afc2d0d6ee75da308bc7/ymusic/f44b/c596/145c/e1b6fc162d3c4ba9f64f6b4f78d876e8.mp3` }></audio> */}
        <div className={ playerStyle.pic } style={{ transform: `rotate(${picRoatDeg}deg)` }}></div>
        <div className={ playerStyle.control }>
          <MIcon name="icon-playAll" color="#666" size={40} />
          <MIcon name="icon-previousAudio" color="#666" size={40} />
          <MIcon name="icon-startAudio" color="#666" size={40} />
          <MIcon name="icon-nextAudio" color="#666" size={40} />
          <MIcon name="icon-audioList" color="#666" size={40} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Player)