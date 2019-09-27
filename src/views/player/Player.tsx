import React, {useContext, useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile'

import MHeader from '../../components/m-header/MHeader'
import MIcon from '../../components/m-icon/MIcon'
import MTimeline from '../../components/m-timeline/MTimeline'
import MLyric from "../../components/m-lyric/MLyric"
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
      <div className={playerStyle.bg} style={{ backgroundImage: `url(${ state.singer.picUrl })` }}/>
      <div className={ playerStyle.playerContainer }>
        <div className={playerStyle.pic} style={{
          animationTimingFunction: '',
          animationPlayState: state.player.status ? 'running' : 'paused',
          backgroundImage: `url(${ state.singer.picUrl })`
        }}/>
        <MLyric currentTime={ state.player.currentTime } lyric="[by:Evi_]\n[00:00.000] 作曲 : 许嵩\n[00:01.000] 作词 : 许嵩\n[00:15.450]是否每一部戏都看得完整场\n[00:22.350]是否每一天过得都有多难忘\n[00:29.300]表情迟钝可能因为比较爱想\n[00:36.250]不擅长眉目表达\n[00:42.010]总在盼望 总在失望\n[00:45.460]日子还不都这样\n[00:48.960]俗的无畏 雅的轻狂\n[00:52.460]还不都是一副臭皮囊\n[00:59.260]他们说快写一首情歌雅俗共赏\n[01:03.710]落笔传神还要容易传唱\n[01:07.110]上得厅堂也下得厨房\n[01:10.210]就像我一直在找的姑娘\n[01:14.070]快写一首情歌雅俗共赏\n[01:17.570]打完字谜还要接着打榜\n[01:21.020]如果胡同弄堂全都播放\n[01:24.220]气韵里居然添了些孤芳自赏\n[01:46.300]是否每一场美梦醒来都很爽\n[01:52.660]是否每一次成熟都徒增了业障\n[01:59.510]比痛和痒更多的\n[02:02.760]是不痛不痒\n[02:06.710]所以我爱进剧场\n[02:12.460]总在盼望 总在失望\n[02:15.960]日子还不都这样\n[02:19.260]俗的无畏 雅的轻狂\n[02:22.810]还不都是一副臭皮囊\n[02:29.020]他们说快写一首情歌雅俗共赏\n[02:34.120]落笔传神还要容易传唱\n[02:37.620]上得厅堂也下得厨房\n[02:40.670]就像我一直在找的姑娘\n[02:44.570]快写一首情歌雅俗共赏\n[02:48.020]打完字谜还要接着打榜\n[02:51.480]如果胡同弄堂全都播放\n[02:54.630]气韵里居然添了些孤芳自赏\n[03:02.380]谁的故事有营养\n[03:05.480]大俗或大雅的都在理直气壮\n[03:09.380]洒狗血或白雪的现场\n[03:13.230]都邀我观赏\n[03:14.830]还真是大方\n[03:19.430]快写一首情歌雅俗共赏\n[03:22.790]落笔传神还要容易传唱\n[03:26.240]上得厅堂也下得厨房\n[03:29.690]就像我一直在找的姑娘\n[03:33.290]有没有一种生活雅俗共赏\n[03:36.690]情节起伏跌宕让人向往\n[03:40.190]满纸荒唐中窥见满脸沧桑\n[03:43.490]触到神经就要懂得鼓掌\n[03:46.840]别说一不在乎二没期望\n[03:50.300]太超脱 中枪中奖感觉会一样\n"/>
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
