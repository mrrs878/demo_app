import React, {useRef, useState, useEffect, RefObject} from 'react'

//@ts-ignore
import mTimelineStyle from './mTimeline.module.less'

interface ITimelineProps {
  duration: number,
  lineColor: string,
  onRef?: (ref: RefObject<HTMLDivElement>) => void,
  adjust?: (time: number) => void
  play: () => void,
  pause: () => void,
  reset: () => void
}

const Timeline: React.FC<ITimelineProps> = props => {
  const [animationStatus, setAnimationStatus] = useState<boolean>(false);
  const [animation, setAnimation] = useState<Animation>();
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(animationRef.current) {
      let tmp = new KeyframeEffect(animationRef.current, [
        { transform: 'translateX(0)' },
        { transform: 'translateX(100%)' }
      ], {
        duration: props.duration,
        easing: 'linear'
      });
      setAnimation(new Animation(tmp, document.timeline))
    }
  }, [ animationRef.current ]);
  useEffect(() =>{
    if(containerRef && props.onRef) {
      props.onRef(containerRef)
    }
  })
  function handleAdjustTime(e: React.MouseEvent<HTMLDivElement, MouseEvent>)  {
    if(animation) {
      let time = Math.floor(e.clientX / window.screen.width * props.duration)
      animation.currentTime = time;
      animation.play()
      props.adjust && props.adjust(time/ 1000)
    }
  }
  function handlePlayAnimation() {
    setAnimationStatus(true)
  }
  function handlePauseAnimation() {
    setAnimationStatus(false)
  }
  function handleResetAnimation() {
    setAnimationStatus(false)
    if(animationRef.current) {
      // animationRef.current.
    }
  }
  return (
    <div ref={ containerRef } className={ mTimelineStyle.container } onClick={ handleAdjustTime }>
      <div ref={ animationRef } onClick={ handleAdjustTime } className={`${mTimelineStyle.timeLine}`}
           style={{ animationPlayState: animationStatus ? 'running' : 'paused' }}
      />
    </div>
  )
};

export default Timeline
