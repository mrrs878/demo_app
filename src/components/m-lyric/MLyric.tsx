import React, { useState, useEffect } from "react"

//@ts-ignore
import mLyricStyle from './mLyric.module.less'

interface ILyricItem {
  time: number,
  text: string,
  preText: string,
  nextText: string
}
interface IMLyricProps {
  lyric: string,
  currentTime: number
}

const MLyric: React.FC<IMLyricProps> = props => {
  const [formattedLyricItem, setFormattedLyricItem] = useState<Map<number, ILyricItem>>(new Map<number, ILyricItem>());
  // const [updateLyricItem_f, setUpdateLyricItem_f] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ILyricItem>({ time: 0, text: '', preText: '', nextText: '' });
  let updateLyricItem_f = false;

  useEffect(() => {
    formatLyric()
  }, [ props.lyric ]);
  useEffect(() => {
    let tmp = formattedLyricItem.get(Math.floor(props.currentTime));
    if(updateLyricItem_f === true) updateLyricItem_f = false;
    if(tmp) {
      setCurrentItem(tmp);
      updateLyricItem_f = true
    }
  }, [ props.currentTime ]);

  function formatLyric() {
    let res = new Map<number, ILyricItem>();
    let tmp: ILyricItem = { time: 0, nextText: '', preText: '', text: '' };
    let lyrics = props.lyric.replace(/[\[|\]]/g, '').split("\\n");
    lyrics.forEach((item, index) => {
      let time = parseInt(item.slice(0, 2)) * 60 + parseInt(item.slice(3, 5));
      res.set(time, {
        text: item.slice(9),
        time,
        nextText: (index === lyrics.length - 1 ? '' : lyrics[index + 1].slice(9)),
        preText: (index === 0 ? '' : lyrics[index - 1].slice(9))
      });
    });
    setFormattedLyricItem(res)
  }

  return (
    <div className={ mLyricStyle.content }>
      <p className={ mLyricStyle.preItem}>{ currentItem.preText }</p>
      <p className={ updateLyricItem_f ? mLyricStyle.currentItemActive : mLyricStyle.currentItem } >{ currentItem.text }</p>
      <p className={ mLyricStyle.nextItem  }>{ currentItem.nextText }</p>
    </div>
  )
};

export default MLyric;
