import React from 'react'

//@ts-ignore
import mIConProps from './mIcon.module.less'

interface IMIconProps {
  name: string,
  text?: string,
  color?: string
}

const mIcon: React.FC<IMIconProps> = (props) => (
  <div className={ mIConProps.svgContainer } style={{fill: props.color}}>
    <svg className={ mIConProps.svgIcon } aria-hidden={ true }>
      <use xlinkHref={ `#${props.name}` }></use>
    </svg>
    <p>{ props.text }</p>
  </div>
)

mIcon.defaultProps = {
  name: '',
  text: '',
  color: '#fff'
}

export default mIcon