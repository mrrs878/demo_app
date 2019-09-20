import React, { useState, useEffect, Fragment } from 'react'

import { Carousel, WingBlank, WhiteSpace } from 'antd-mobile'

import { getBanners, getRecommendList } from '../../config/api'
import { AxiosResponse } from 'axios'
import MScroll from '../../components/m-scroll/MScroll'
import MIcon from '../../components/m-icon/mIcon'

//@ts-ignore
import recommendStyle from './recommend.module.less'

interface IBanner {
  imageUrl: string,
  url: string
}
interface IBannerRes {
  banners: Array<IBanner>,
  code: number
}

interface IRecommendList {
  type: number,
  name: string,
  copywriter: string,
  picUrl: string,
  canDislike: boolean,
  playCount: number,
  trackCount: number,
  highQuality: boolean,
  alg: string
}
interface IRecommendListRes {
  code: number,
  hasTaste: boolean,
  category: number,
  result: Array<IRecommendList>
}

const Recommend = () => {
  const [ banners, setBanners ] = useState(new Array<IBanner>())
  const [ recommendList, setRecommendList ] = useState(new Array<IRecommendList>())

  useEffect(() => {
    getBanners().then((res: AxiosResponse<IBannerRes>) => {
      console.log(res);
      setBanners(res.data.banners)
    }).catch(e => {
      console.log(e);
    })
    getRecommendList().then((res: AxiosResponse<IRecommendListRes>) => {
      console.log(res.data.result);
      setRecommendList(res.data.result)
    }).catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <div className={ recommendStyle.content }>
      <WhiteSpace style={{ backgroundColor: '#d44439' }} />
      <MScroll>
        <div>
          <Fragment>
            <div className={ recommendStyle.carouselBefore }></div>
            <Carousel
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
          </Fragment>
          <div className={ recommendStyle.listContainer }>
            {
              recommendList.map(item => (
                <div className={ recommendStyle.listItem }>
                  <img src={ item.picUrl } width="100%"/>
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
}

export default Recommend