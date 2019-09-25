import React from 'react'

//@ts-ignore
import mIConStyle from './mIcon.module.less'

interface IMIconProps {
  name: string,
  className?: string,
  color?: string,
  size?: number,
  onClick?: () => void
}

const MIcon: React.FC<IMIconProps> = (props) => (
  <div className={`${ mIConStyle.svgContainer } ${ props.className }`} style={{ fill: props.color }} onClick={ props.onClick }>
    <svg className={ mIConStyle.svgIcon } aria-hidden={ true } style={{fontSize: `${props.size}px`, width: `${props.size}px`}}>
      <use xlinkHref={`#${props.name}`}/>
    </svg>
    <span className={ mIConStyle.text } style={{ fontSize: `${props.size}px`, color: props.color, margin: 0 }}>{ props.children }</span>
  </div>
);

MIcon.defaultProps = {
  name: '',
  color: '#fff'
};

export default MIcon
