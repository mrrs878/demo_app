import React from 'react'

import MIcon from '../m-icon/MIcon'

//@ts-ignore
import mHeaderStyle from './mHeader.module.less'

interface IMHeaderProps {
  bgColor?: string,
  titleColor?: string,
  titlePosition?: 'left' | 'center',
  size?: number
}

const Header: React.FC<IMHeaderProps> = props => (
  <div className={ mHeaderStyle.content } style={{ backgroundColor: props.bgColor }}>
    <div className={ mHeaderStyle.left }>
      <MIcon name="icon-back" color={ props.titleColor } size={ props.size }>{ props.titlePosition === 'center' ? '' : props.children }</MIcon>
    </div>
    <div className={ mHeaderStyle.center } style={{ color: props.titleColor, fontSize: props.size }}>
      { props.children }
    </div>
    <div className={ mHeaderStyle.right }>
    </div>
  </div>
)

Header.defaultProps = {
  bgColor: '#fff',
  titleColor: '#000',
  titlePosition: 'left',
  size: 18
}

export default Header