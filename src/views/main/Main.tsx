import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Tabs, NavBar, Icon } from 'antd-mobile';

import Recommend from '../recommend/Recommend'
import Singers from '../singers/Singers'
import Charts from '../charts/Charts'
import MIcon from '../../components/m-icon/MIcon'

//@ts-ignore
import mainStyle from './main.module.less'
import MHeader from "../../components/m-header/MHeader";

interface IMainProps extends RouteComponentProps {}

const tabs = [
  { title: '推荐' },
  { title: '歌手' },
  { title: '排行榜' }
];

const Main: React.FC<IMainProps> = props => {
  function handleRightClick() {
    props.history.push('/main/search')
  }

  return (
    <div className={ mainStyle.content }>
      <MHeader bgColor="#d44439" titleColor="#fff" titlePosition="center" leftIcon="icon-menu" rightContext={[<MIcon key="search" name="icon-search"/>]} onRightClick={handleRightClick}>云音悦</MHeader>
      <div style={{height: '1rem', width: '100%'}}/>
      <div className={ mainStyle.item }>
        <Tabs
          tabBarBackgroundColor="#d44439"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff"
          tabBarUnderlineStyle={ { height: '3px', backgroundColor: '#fff', border: 'none' } }
          tabs={tabs}
          swipeable={false}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <Recommend />
          <Singers />
          <Charts />
        </Tabs>
      </div>
  </div>
  )
};

export default Main
