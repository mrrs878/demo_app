import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Carousel } from 'antd-mobile'

import { getBanners, getRecommendList } from '../../apis/api'
import { AxiosResponse } from 'axios'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/MIcon'
import { IBanner, IRecommendList } from '../../interfaces'
import { IBannerRes, IRecommendListRes } from '../../interfaces/ajaxRes'

//@ts-ignore
import recommendStyle from './recommend.module.less'

interface IRecommendProps extends RouteComponentProps {}

const Recommend: React.FC<IRecommendProps> = props => {
  const [ banners, setBanners ] = useState(new Array<IBanner>());
  const [ recommendList, setRecommendList ] = useState(new Array<IRecommendList>());

  useEffect(() => {
    getBanners().then((res: AxiosResponse<IBannerRes>) => {
      setBanners(res.data.banners)
    }).catch(e => {
      console.log(e);
    });
    getRecommendList().then((res: AxiosResponse<IRecommendListRes>) => {
      setRecommendList(res.data.result)
    }).catch(e => {
      console.log(e);
    })
  }, []);

  return (
    <div className={ recommendStyle.content }>
      <MScroll>
        <div>
          <div className={recommendStyle.carouselBefore}/>
          <Carousel
            style={{ paddingTop: '0.2rem' }}
            autoplay={ true }
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {
              banners.map((banner, index) => (
                <img
                  key={ index }
                  src={ banner.imageUrl }
                  alt=""
                  style={{ width: '98%', verticalAlign: 'top', borderRadius: '5px', margin: '0 auto' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              ))
            }
          </Carousel>
          <div className={ recommendStyle.listContainer }>
            {
              recommendList.map((item, index) => (
                <div key={ index } className={ recommendStyle.listItem } onClick={ () => props.history.push(`/recommend/${ item.id }`) }>
                  <img src={ item.picUrl } width="100%" alt=""/>
                  <div className={ recommendStyle.itemListen }>
                    <MIcon name="icon-erji" size={13}>{ `${Math.ceil(item.playCount/10000)}万` }</MIcon>
                  </div>
                  <p className={ recommendStyle.itemText }>{ item.name }</p>
                </div>
              ))
            }
          </div>
        </div>
      </MScroll>
    </div>
  )
};

export default withRouter(Recommend)
