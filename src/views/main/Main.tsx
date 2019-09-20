import React from 'react'

import { Tabs, NavBar, Icon } from 'antd-mobile';

import Recommend from '../recommend/Recommend'
import Singers from '../signers/Singers'
import Charts from '../charts/Charts'
import MIcon from '../../components/m-icon/mIcon'

//@ts-ignore
import mainStyle from './main.module.less'

const tabs = [
  { title: '推荐' },
  { title: '歌手' },
  { title: '排行榜' }
];

const Main = () => {
  return (
    <div className={ mainStyle.content }>
      <NavBar
        className={ mainStyle.header }
        mode="light"
        icon={<MIcon name="icon-menu" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />
        ]}
      >
      云音悦</NavBar>
      <div className={ mainStyle.item }>
        <Tabs
          tabBarBackgroundColor="#d44439"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff"
          tabBarUnderlineStyle={ { height: '3px', backgroundColor: '#fff', border: 'none' } }
          tabs={tabs}
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
}

export default Main