import React, {useContext} from "react"
import {RouteComponentProps, withRouter} from 'react-router-dom'
//@ts-ignore
import playListStyle from './playList.module.less'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/MIcon'
import {RootContext, types} from "../../store";
import {SET_PLAYING_INDEX} from "../../store/type";

interface IPlayListProps extends RouteComponentProps {
  zIndex: -1 | 1,
  onClose: () => void
}

const PLAY_LIST: React.FC<IPlayListProps> = props => {
  const { state, dispatch } = useContext(RootContext);

  function handleClose() {
    props.onClose()
  }
  function handlePullDown() {
    props.onClose()
  }
  function handleSetPlayer(index: number) {
    props.history.push(`/player/${ state.playList[index].id }/${ state.playList[index].dt }`);
    dispatch({ type: SET_PLAYING_INDEX, data: index });
    dispatch({ type: types.SET_SONG, data: state.playList[index] });
    dispatch({ type: types.SET_PLAYING_INDEX, data: index });
  }

  return (
    <div>
      <div className={playListStyle.mask} style={{ zIndex: props.zIndex, display: props.zIndex > 0 ? 'block' : 'none' }} onClick={ handleClose }/>
      <div className={ playListStyle.content } style={{ height: props.zIndex > 0 ? '6rem' : '0rem' }}>
        <div className={ playListStyle.title }>
          <MIcon name="icon-yplay" color="#f00" size={14}/>
          <span className={ playListStyle.span }>播放全部</span>
          <MIcon name="icon-delete" color="#f00" size={14}/>
        </div>
        <div style={{ position: "absolute", top: '1rem', left: '0.5rem', bottom: 0, right: '0.5rem' }} >
          <MScroll onPullDown={ handlePullDown }>
            <div>
              {
                state.playList.map((item, index) => (
                  <div key={index} className={ playListStyle.item } onClick={ () => handleSetPlayer(index) }>
                    <MIcon name="icon-yplay" color={ index === state.playingIndex ? '#f00' : 'rgba(0, 0, 0, 0)' } size={14}/>
                    <span className={ playListStyle.itemSpan }>{ item.name + ' - ' + item.ar[0].name }</span>
                    <MIcon name="icon-delete" color="#f00" size={14}/>
                  </div>
                ))
              }
            </div>
          </MScroll>
        </div>
      </div>
    </div>
  )
};

PLAY_LIST.defaultProps = {
  zIndex: -1
};

export default withRouter(PLAY_LIST)
