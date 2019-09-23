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
  const bgWrapper = useRef()
  const [bgScale, setBgScroll] = useState<number>(1);

  useEffect(() => {

  });

  const handleScroll = useCallback((pos: BScroll) => {
    let height = 600;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + 100;

    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
    }
    setBgScroll(position.y / 100 + 1)
  }, []);
  // function handleScroll(pos: BScroll) {
  //   let height = 600;
  //   const newY = pos.y;
  //   const imageDOM = imageWrapper.current;
  //   const buttonDOM = collectButton.current;
  //   const headerDOM = header.current;
  //   const layerDOM = layer.current;
  //   const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
  //
  //   //指的是滑动距离占图片高度的百分比
  //   const percent = Math.abs(newY / height);
  //   setBgScroll(position.y / 100 + 1)
  // }
  return (
      <div className={ singerDetailStyle.content }>
        <MHeader titleColor="#fff">{ state.singer.name }</MHeader>
        <div className={singerDetailStyle.bg} style={{ backgroundImage: `url(${state.singer.picUrl})`, transform: `scale(${bgScale})` }}/>
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
