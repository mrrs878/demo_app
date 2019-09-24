import React, { Fragment, useState, useEffect } from "react"

//@ts-ignore
import playListStyle from './playList.module.less'
import MScroll from '../../components/m-scroll/MScroll'
import { IPlayList } from '../../interfaces'

interface IPlayListProps {
  zIndex: -1 | 1,
  list: IPlayList
}

const PLAY_LIST: React.FC<IPlayListProps> = props => {
  const [ playList_f, setPlayList_f ] = useState<-1 | 1>(-1);
  useEffect(() => {
    setPlayList_f(props.zIndex)
  }, [ props.zIndex ]);

  return (
    <Fragment>
      <div className={playListStyle.mask} style={{ zIndex: playList_f, opacity: playList_f }} onClick={ () => setPlayList_f(-1) }/>
      <div className={ playListStyle.content } style={{ zIndex: playList_f, opacity: playList_f }}>this is play_list</div>
    </Fragment>
  )
};

PLAY_LIST.defaultProps = {
  zIndex: -1
};

export default PLAY_LIST
