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
    <svg className={ mIConStyle.svgIcon } aria-hidden={ true } style={{height: `${props.size}px`, lineHeight: `${props.size}px`, width: `${props.size}px`}}>
      <use xlinkHref={ `#${props.name}` }></use>
    </svg>
    <p className={ mIConStyle.text } style={{ fontSize: `${props.size}px`, color: props.color }}>{ props.children}</p>
  </div>
)

MIcon.defaultProps = {
  name: '',
  color: '#fff'
}

export default MIcon
