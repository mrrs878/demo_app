import React, {useRef, useState, useEffect} from 'react'

//@ts-ignore
import mTimelineStyle from './mTimeline.module.less'

export interface ITimelineProps {
  duration: number,
  lineColor: string,
  status?: boolean,
  onRef?: (ref: any) => void,
  adjust?: (time: number) => void
}

const Timeline: React.FC<ITimelineProps> = props => {
  const [animation, setAnimation] = useState<Animation>();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(animationRef.current) {
      console.log(KeyframeEffect);
      let tmp = new KeyframeEffect(animationRef.current, [
        { transform: 'translateX(0)' },
        { transform: 'translateX(100%)' }
      ], {
        duration: props.duration,
        easing: 'linear'
      });
      setAnimation(new Animation(tmp, document.timeline))
    }
  }, [props.duration]);
  useEffect(() => {
    if(animation)  {
      if(props.status) animation.play();
      else animation.pause()
    }
  }, [ props.status, animation ]);
  useEffect(() =>{});
  function handleAdjustTime(e: React.MouseEvent<HTMLDivElement, MouseEvent>)  {
    if(animation) {
      let time = Math.floor(e.clientX / window.screen.width * props.duration)
      animation.currentTime = time;
      animation.play();
      props.adjust && props.adjust(time/ 1000)
    }
  }
  return (
    <div ref={ containerRef } className={ mTimelineStyle.container } onClick={ handleAdjustTime }>
      <div ref={ animationRef } onClick={ handleAdjustTime } className={`${mTimelineStyle.timeLine}`}/>
    </div>
  )
};

export default Timeline
