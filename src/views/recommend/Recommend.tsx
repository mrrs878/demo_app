import React, { useState, useEffect } from 'react'

import { Carousel, WingBlank } from 'antd-mobile'

import { getBanners, getRecommendList } from '../../config/api'
import { AxiosResponse } from 'axios'
import MScroll from '../../components/m-scroll/MScroll'

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
    // getRecommendList().then((res: AxiosResponse<IRecommendListRes>) => {
    //   console.log(res.data.result);
    //   setRecommendList(res.data.result)
    // }).catch(e => {
    //   console.log(e);
    // })
  }, [])

  return (
    <div className={ recommendStyle.content }>
      <MScroll>
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
                style={{ width: '100%', verticalAlign: 'top', height: '160px', borderRadius: '5px' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            ))
          }
        </Carousel>
        <div style={{ height: '200px' }}>111</div>
        <div style={{ height: '200px' }}>111</div>
        <div style={{ height: '200px' }}>111</div>
        <div style={{ height: '200px' }}>111</div>
      </MScroll>
    </div>
  )
}

export default Recommend