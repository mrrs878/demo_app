import React, { useContext, useEffect, useState }  from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom'

//@ts-ignore
import mPlayerStyle from './mPlayer.module.less';
import MIcon from "../m-icon/MIcon";
import {RootContext, types} from "../../store";
import defaultImg from '../../assets/images/logo.png';
import PlayList from "../play-list/PlayList";

interface IFooterProps extends RouteComponentProps {}

const MPlayer: React.FC<IFooterProps> = props => {
  const [ picUrl, setPicUrl ] = useState<string>('');
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    setPicUrl(state.singer.picUrl ? `url(${ state.song.al.picUrl })` : '')
  }, [ state.singer.picUrl ]);

  function handleTogglePlayerStatus() {
    if(!state.player.url) return;
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: !state.player.status } });
  }
  function handleTogglePlayList() {
    setPlayList_f(1)
  }
  function handleToPlayerPage() {
    props.history.push(`/player/${ state.song.id }`)
  }

  return (
    <div className={ mPlayerStyle.content } style={{ opacity: !props.location.pathname.includes('player') && state.song.id ? 1 : 0 }}>
      <div className={mPlayerStyle.pic} style={{ backgroundImage: state.singer.picUrl ? `url(${state.singer.picUrl})` : 'unset', animationPlayState: state.player.status ? 'running' : 'paused' }} onClick={ handleToPlayerPage }/>
      <div className={ mPlayerStyle.info } onClick={ handleToPlayerPage }>
        <span className={ mPlayerStyle.infoItem }>{ state.song.name || '云音悦' }</span>
        <span className={ mPlayerStyle.infoItem }>{ state.song.ar[0] ? state.song.ar[0].name : '云音悦' }</span>
      </div>
      <div className={ mPlayerStyle.control }>
        <MIcon name={ state.player.status ? 'icon-pauseAudio' : 'icon-startAudio' } color="#f00" size={40} onClick={ handleTogglePlayerStatus }/>
        <MIcon name="icon-audioList" color="#f00" size={40} onClick={ handleTogglePlayList }/>
      </div>
      <PlayList zIndex={ playList_f } onClose={() => setPlayList_f(-1)}/>
    </div>
  )
};

export default withRouter(MPlayer)
