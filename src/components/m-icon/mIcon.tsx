import React from 'react'

//@ts-ignore
import mIConStyle from './mIcon.module.less'

interface IMIconProps {
  name: string,
  className?: string,
  color?: string,
  size?: number
}

const mIcon: React.FC<IMIconProps> = (props) => (
  <div className={`${ mIConStyle.svgContainer } ${ props.className }`} style={{ fill: props.color }}>
    <svg className={ mIConStyle.svgIcon } aria-hidden={ true } style={{height: `${props.size}px`, lineHeight: `${props.size}px`}}>
      <use xlinkHref={ `#${props.name}` }></use>
    </svg>
    <p className={ mIConStyle.text }>{ props.children}</p>
  </div>
)

mIcon.defaultProps = {
  name: '',
  color: '#fff'
}

export default mIcon