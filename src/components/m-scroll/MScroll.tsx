import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react'
import BScroll, { Position } from 'better-scroll'

//@ts-ignore
import mScrollStyle from './mScroll.module.less';
import {posix} from "path";

export interface IScrollProps {
  direction?: 'vertical'| 'horizontal',
  refresh?: boolean,
  pullDownLoading?: boolean,
  pullUpLoading?: boolean,
  bounceTop?: boolean,
  bounceBottom?: boolean,
  click?: boolean
  onPullUp?: (y: number) => void,
  onPullDown?: (y: number) => void,
  onScroll?: (scroll: BScroll) => void
}

const Scroll: React.FC<IScrollProps> = forwardRef((props, ref) =>{
  const [ bScroll, setBScroll ] = useState();
    const scrollContainerRef = useRef(null);
    const { direction, click, refresh,  bounceTop, bounceBottom } = props;
    const { onPullUp, onPullDown, onScroll } = props;

    useEffect(() => {
      const scroll = new BScroll(scrollContainerRef.current || '', {
        scrollX: direction === "horizontal",
        scrollY: direction === "vertical",
        probeType: 3,
        click: click,
        bounce:{
          top: bounceTop,
          bottom: bounceBottom
        }
      });
      setBScroll(scroll);
      return () => setBScroll(null)
    }, []);

    useEffect(() => {
      if(!bScroll || !onScroll) return;
      bScroll.on('scroll', (scroll: BScroll) => {
        onScroll(scroll)
      });
      return () => bScroll.off('scroll')
    }, [onScroll, bScroll]);

    useEffect(() => {
      if(!bScroll || !onPullUp) return;
      bScroll.on('scrollEnd', () => {
        if(bScroll.y <= bScroll.maxScrollY + 100){
          onPullUp(bScroll.y);
        }
      });
      return () => bScroll.off('scrollEnd')
    }, [onPullUp, bScroll]);

    useEffect(() => {
      if(!bScroll || !onPullDown) return;
      bScroll.on('touchEnd', (pos: Position) => {
        if(pos.y > 50) {
          onPullDown(pos.y)
        }
      });
      return () => bScroll.off('touchEnd')
    }, [onPullDown, bScroll]);


    useEffect(() => {
      if(refresh && bScroll) bScroll.refresh()
    });

    useImperativeHandle(ref, () => ({
      refresh() {
        if(bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      getBScroll() {
        if(bScroll) {
          return bScroll;
        }
      }
    }));

    return (
      <div ref={ scrollContainerRef } className={ mScrollStyle.content }>
        { props.children }
      </div>
    )
});

Scroll.defaultProps = {
  direction: 'vertical',
  refresh: true,
  click: true,
  pullDownLoading: false,
  pullUpLoading: false,
  bounceBottom: true,
  bounceTop: true
};


export default Scroll
