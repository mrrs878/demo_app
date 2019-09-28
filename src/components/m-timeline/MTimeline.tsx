import React, {useRef, useState, useEffect} from 'react'

//@ts-ignore
import mTimelineStyle from './mTimeline.module.less'

export interface ITimelineProps {
  process: number,
  lineColor: string,
  status?: boolean,
  onRef?: (ref: any) => void,
  adjust?: (time: number) => void
}

const Timeline: React.FC<ITimelineProps> = props => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  function handleAdjustTime(e: React.MouseEvent<HTMLDivElement, MouseEvent>)  {
    if(animationRef.current) {
      let time = e.clientX / window.screen.width;
      animationRef.current.style.transform = `translateX(${time * 100}%)`;
      props.adjust && props.adjust(time)
    }
  }

  return (
    <div ref={ containerRef } className={ mTimelineStyle.container } onClick={ handleAdjustTime }>
      <div ref={ animationRef } onClick={ handleAdjustTime } style={{ transform: `translateX(${props.process}%)` }} className={`${mTimelineStyle.timeLine}`}/>
    </div>
  )
};

export default Timeline
