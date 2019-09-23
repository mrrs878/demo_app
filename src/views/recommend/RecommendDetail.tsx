import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import MHeader from '../../components/m-header/MHeader'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/MIcon'
import { getListDetail } from '../../apis/api'
import { IPlayList, ITrack, IListDetailRes } from '../../interfaces/index'

//@ts-ignore
import recommendDetailStyle from './recommendDetail.module.less'
import { object } from 'prop-types'

interface IURLParams {
  id: string
}

interface IRecommendDetailProps extends RouteComponentProps<IURLParams> {

}

class PlayList implements IPlayList {
  name: string
  playCount: number
  coverImgUrl: string
  tracks: Array<ITrack>

  constructor(name = '', playCount = 0, coverImgUrl = '', tracks = []) {
    this.name = name
    this.playCount = playCount
    this.coverImgUrl = coverImgUrl
    this.tracks = tracks
  }
}
class List implements IListDetailRes {
  code: number
  relatedVideos: object
  playlist: {
    name: string,
    playCount: number,
    coverImgUrl: string
    tracks: Array<ITrack>
  }

  constructor(code = 0, relatedVideos = object, playlist = new PlayList() ) {
    this.code = code
    this.relatedVideos = relatedVideos
    this.playlist = playlist
  }
}

const RecommendDetail: React.FC<IRecommendDetailProps> = (props) => {
  const [ listId, setListID ] = useState('')
  const [ listDetail, setListDetail ] = useState(new List())
  useEffect(() => {
    setListID(props.match.params.id)
  })
  useEffect(() => {
    if(listId) {
      getListDetail({ id: listId }).then((res: AxiosResponse<IListDetailRes>) => {
        setListDetail(res.data)
      }).catch(e => {
        console.log(e);
      })
    }
  }, [ listId ])

  return (
    <div className={ recommendDetailStyle.content }>
      <MHeader bgColor="#00000000">歌单</MHeader>
      <div className={ recommendDetailStyle.listInfoContainer }>
        <div className={ recommendDetailStyle.listInfoContainerBg } style={{ background: `url(${ listDetail.playlist.coverImgUrl }) no-repeat 0 0 / 100% 100%`}}></div>
        <div className={ recommendDetailStyle.listInfo }>
          <div className={ recommendDetailStyle.listInfoBg } style={{ background: `url(${ listDetail.playlist.coverImgUrl }) no-repeat 0 0 / 100% 100%`}}></div>
          <span className={ recommendDetailStyle.listInfoText }>{ listDetail.playlist.name }</span>
        </div>
        <div className={ recommendDetailStyle.listAction }>
          <MIcon name="icon-message">评论</MIcon>
          <MIcon name="icon-like">点赞</MIcon>
          <MIcon name="icon-add">收藏</MIcon>
          <MIcon name="icon-more_android_light">更多</MIcon>
        </div>
      </div>
      <div className={ recommendDetailStyle.scrollContainer }>
        <MScroll>
          <div className={ recommendDetailStyle.listContainer }>
            {
              listDetail.playlist.tracks.map((item, index) => (
                <div key={ index } className={ recommendDetailStyle.listContainerItem } onClick={ () => props.history.push(`/player/${ item.id }/${ item.dt }`) }>
                  <span>{ index + 1 }</span>
                  <div className={ recommendDetailStyle.listContainerItemInfo }>
                    <p className={ recommendDetailStyle.listContainerItemInfoSigner }>{ item.name }</p>
                    <p>{ item.ar[0].name }</p>
                  </div>
                </div>
              ))
            }
          </div>
        </MScroll>
      </div>
      <div style={{ height: '1rem' }}></div>
      <div className={ recommendDetailStyle.listFooter }>
        <MIcon name="icon-yplay" color="#000">播放全部(共{ listDetail.playlist.tracks.length }首)</MIcon>
        <button className={ recommendDetailStyle.listFooterBtn }>收藏</button>
      </div>
    </div>
  )
}

export default withRouter(RecommendDetail)
