import React  from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom'

//@ts-ignore
import footerStyle from './footer.module.less';

interface IFooterProps {

}

const Footer: React.FC<IFooterProps> = props => {
  return (
    <div className={ footerStyle.content }>this is footer</div>
  )
};

export default Footer
