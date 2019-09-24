import React, { useEffect, useState, useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import MHeader from '../../components/m-header/MHeader'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/MIcon'
import { getListDetail } from '../../apis/api'
import { IPlayList, ITrack } from '../../interfaces'
import { IListDetailRes } from '../../interfaces/ajaxRes'
import { IGetListDetail } from '../../apis/apiParams'
import { Song } from '../../store/model'
import {RootContext} from "../../store";
import * as types from '../../store/type'
//@ts-ignore
import recommendDetailStyle from './recommendDetail.module.less'

interface IRecommendDetailProps extends RouteComponentProps<IGetListDetail> {}
const RecommendDetail: React.FC<IRecommendDetailProps> = (props) => {
  const [ listId, setListID ] = useState('');
  const [ listDetail, setListDetail ] = useState<IPlayList>();
  const { state, dispatch } = useContext(RootContext);
  useEffect(() => {
    setListID(props.match.params.id)
  }, [ props.match.params.id ]);
  useEffect(() => {
    if(listId) {
      getListDetail({ id: listId }).then((res: AxiosResponse<IListDetailRes>) => {
        setListDetail(res.data.playlist)
      }).catch(e => {
        console.log(e);
      })
    }
  }, [ listId ]);

  function handleToPlayer(item: ITrack) {
    props.history.push(`/player/${ item.id }/${ item.dt }`);
    let song = new Song({ name: item.name, id: item.id, picUrl: (listDetail ? listDetail.coverImgUrl : '') });
    //@ts-ignore
    dispatch({ type: types.SET_SONG, data: song })
  }

  return (
    <div className={ recommendDetailStyle.content }>
      <MHeader bgColor="#00000000">歌单</MHeader>
      <div className={ recommendDetailStyle.listInfoContainer }>
        <div className={recommendDetailStyle.listInfoContainerBg} style={{background: `url(${listDetail && listDetail.coverImgUrl}) no-repeat 0 0 / 100% 100%`}}/>
        <div className={ recommendDetailStyle.listInfo }>
          <div className={recommendDetailStyle.listInfoBg} style={{background: `url(${listDetail && listDetail.coverImgUrl}) no-repeat 0 0 / 100% 100%`}}/>
          <span className={ recommendDetailStyle.listInfoText }>{ listDetail && listDetail.name }</span>
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
              listDetail && listDetail.tracks.map((item, index) => (
                <div key={ index } className={ recommendDetailStyle.listContainerItem } onClick={ () => handleToPlayer(item) }>
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
      <div style={{height: '1rem'}}/>
      <div className={ recommendDetailStyle.listFooter }>
        <MIcon name="icon-yplay" color="#000">播放全部(共{ listDetail && listDetail.tracks.length }首)</MIcon>
        <button className={ recommendDetailStyle.listFooterBtn }>收藏</button>
      </div>
    </div>
  )
};

export default withRouter(RecommendDetail)
