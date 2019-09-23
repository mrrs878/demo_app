import React, {useEffect, useContext, useState, useCallback, useRef} from "react";
import BScroll from 'better-scroll'

import { RootContext } from '../../store'
import MHeader from '../../components/m-header/MHeader'
import MScroll from '../../components/m-scroll/MScroll'

//@ts-ignore
import singerDetailStyle from './singerDetail.module.less'

interface ISingerDetailProps {}

const SingerDetail: React.FC<ISingerDetailProps> = props => {
  const { state } = useContext(RootContext);
  const imgRef= useRef<HTMLDivElement>(null);
  const scrollBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

  });

  const handleScroll = useCallback((pos: BScroll) => {
    let height = 290;
    const newY = pos.y;
    // const layerDOM = layer.current;
    // const minScrollY = -(height - OFFSET) + 100;

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
  return (
      <div className={ singerDetailStyle.content }>
        <MHeader titleColor="#fff" bgColor="#00000000">{ state.singer.name }</MHeader>
        <div ref={ imgRef } className={singerDetailStyle.bg} style={{ backgroundImage: `url(${state.singer.picUrl})` }}>
          <div className={singerDetailStyle.filter}/>
        </div>
        <div ref={ scrollBgRef } className={singerDetailStyle.scrollBg}/>
        <div className={ singerDetailStyle.scrollContainer }>
          <MScroll onScroll={ handleScroll }>
            <div>
              <div style={{ height: '200px', width: "100%" }}>111</div>
              <div style={{ height: '200px', width: "100%" }}>111</div>
              <div style={{ height: '200px', width: "100%" }}>111</div>
              <div style={{ height: '200px', width: "100%" }}>111</div>
              <div style={{ height: '200px', width: "100%" }}>111</div>
            </div>
          </MScroll>
        </div>
      </div>
  )
};

export default SingerDetail
