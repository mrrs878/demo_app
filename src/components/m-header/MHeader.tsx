import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import MIcon from '../m-icon/MIcon'

//@ts-ignore
import mHeaderStyle from './mHeader.module.less'

interface IMHeaderProps extends RouteComponentProps {
  bgColor?: string,
  titleColor?: string,
  titlePosition?: 'left' | 'center',
  size?: number,
  leftIcon?: string,
  leftPath?: string,
  rightContext?: React.ReactNode,
  onLeftClick?: (next: () => void)  => void,
  onRightClick?: () => void
}

const Header: React.FC<IMHeaderProps> = props => {
  function next() {
    if(props.leftPath) props.history.push(props.leftPath);
    else props.history.goBack();
  }
  function handleLeftClick() {
    if(props.onLeftClick) props.onLeftClick(next);
    else next()
  }
  function handleRightClick() {
    props.onRightClick && props.onRightClick()
  }

  return (
    <div className={ mHeaderStyle.content } style={{ backgroundColor: props.bgColor }}>
      <div className={ mHeaderStyle.left } onClick={ handleLeftClick }>
        <MIcon name={ props.leftIcon || 'icon-back' } color={ props.titleColor } size={ props.size }>{ props.titlePosition === 'center' ? '' : props.children }</MIcon>
      </div>
      <div className={ mHeaderStyle.center } style={{ color: props.titleColor, fontSize: props.size }}>
        { props.titlePosition === 'left' ? '' : props.children }
      </div>
      <div className={ mHeaderStyle.right } onClick={ handleRightClick }>
        { props.rightContext }
      </div>
    </div>
  );
};

Header.defaultProps = {
  bgColor: '#fff',
  titleColor: '#000',
  titlePosition: 'left',
  size: 18
};

export default withRouter(Header)
