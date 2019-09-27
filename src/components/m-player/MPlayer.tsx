import React, { useContext, useEffect, useState }  from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom'

//@ts-ignore
import mPlayerStyle from './mPlayer.module.less';
import MIcon from "../m-icon/MIcon";
import {RootContext, types} from "../../store";
import defaultImg from '../../assets/images/logo.png';

interface IFooterProps extends RouteComponentProps {}

const MPlayer: React.FC<IFooterProps> = props => {
  const [ picUrl, setPicUrl ] = useState<string>('');
  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    setPicUrl(state.singer.picUrl ? `url(${ state.singer.picUrl })` : '')
  }, [ state.singer.picUrl ]);

  function handleTogglePlayerStatus() {
    if(!state.player.url) return;
    //@ts-ignore
    dispatch({ type: types.SET_PLAYER, data: { status: !state.player.status } });
  }

  return (
    <div className={ mPlayerStyle.content } style={{ opacity: props.location.pathname.includes('player') ? 0 : 1 }}>
      <div className={mPlayerStyle.pic} style={{ backgroundImage: picUrl, animationPlayState: state.player.status ? 'running' : 'paused' }}/>
      <div className={ mPlayerStyle.info }>
        <span className={ mPlayerStyle.infoItem }>{ state.song.name || '云音悦' }</span>
        <span className={ mPlayerStyle.infoItem }>{ state.song.ar[0] ? state.song.ar[0].name : '云音悦' }</span>
      </div>
      <div className={ mPlayerStyle.control }>
        <MIcon name={ state.player.status ? 'icon-pauseAudio' : 'icon-startAudio' } color="#f00" size={40} onClick={ handleTogglePlayerStatus }/>
        <MIcon name="icon-audioList" color="#f00" size={40}/>
      </div>
    </div>
  )
};

export default withRouter(MPlayer)
