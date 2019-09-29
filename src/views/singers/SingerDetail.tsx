import React, {useEffect, useContext, useState, useCallback, useRef} from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom'
import BScroll from 'better-scroll'

import {RootContext, types} from '../../store'
import MHeader from '../../components/m-header/MHeader'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/MIcon'
import { ISingerSongsRes } from '../../interfaces/ajaxRes'
import { ISingerHotSong } from '../../interfaces'
import { getSingerSongs } from '../../apis/api'
import { TGetSingerSongs } from '../../apis/apiParams'

//@ts-ignore
import singerDetailStyle from './singerDetail.module.less'
import {AxiosResponse} from "axios";

interface ISingerDetailProps extends RouteComponentProps<TGetSingerSongs> {}

const SingerDetail: React.FC<ISingerDetailProps> = props => {
  const { state, dispatch } = useContext(RootContext);
  const imgRef= useRef<HTMLDivElement>(null);
  const scrollBgRef = useRef<HTMLDivElement>(null);
  const [ singerSongs, setSingerSongs ] = useState<Array<ISingerHotSong>>([]);

  useEffect(() => {
    getSingerSongs({ id: props.match.params.id }).then((res: AxiosResponse<ISingerSongsRes>) => {
      setSingerSongs(res.data.hotSongs)
    }).catch(e => {
      console.log(e)
    })
  }, [ props.match.params.id ]);

  const handleScroll = useCallback((pos: BScroll) => {
    let height = 290;
    const newY = pos.y;
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      if(imgRef.current) {
        imgRef.current.style["transform"] = `scale(${1 + percent})`;
      }
      if(scrollBgRef.current) {
        scrollBgRef.current.style.top = `${ height + newY }px`
      }
    }
  }, []);

  function handleToPlayer(item: ISingerHotSong, index: number) {
    props.history.push(`/player/${ item.id }/${ item.dt }`);
    dispatch({ type: types.SET_PLAY_LIST, data: singerSongs });
    dispatch({ type: types.SET_SONG, data: singerSongs[index] });
    dispatch({ type: types.SET_PLAYING_INDEX, data: index });
  }

  return (
      <div className={ singerDetailStyle.content }>
        <MHeader titleColor="#fff" bgColor="rgba(0, 0, 0, 0)">{ state.singer.name }</MHeader>
        <div ref={ imgRef } className={singerDetailStyle.bg} style={{ backgroundImage: `url(${state.singer.picUrl})` }}>
          <div className={singerDetailStyle.filter}/>
        </div>
        <div ref={ scrollBgRef } className={singerDetailStyle.scrollBg}>
          <div className={ singerDetailStyle.songTitle }>
            <MIcon name="icon-yplay" color="000" size={30}/>
            <span className={ singerDetailStyle.songTitleSpan }>播放全部(共{singerSongs.length}首)</span>
          </div>
        </div>
        <div className={ singerDetailStyle.scrollContainer }>
          <MScroll onScroll={ handleScroll }>
            <div>
              {
                singerSongs.map((item, index) => (
                  <div key={ index } className={ singerDetailStyle.song } onClick={ () => handleToPlayer(item, index) }>
                    <span>{ index + 1 }</span>
                    <div className={ singerDetailStyle.songInfo }>
                      <p className={ singerDetailStyle.songInfoSigner }>{ item.name }</p>
                      <p>{`${ item.ar[0].name }-${ item.al.name }`}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </MScroll>
        </div>
      </div>
  )
};

export default withRouter(SingerDetail)
