import { IBanner, IRecommendList, ISong, ISinger } from './index'

export interface IBannerRes {
  banners: Array<IBanner>,
  code: number
}
export interface IRecommendListRes {
  code: number,
  hasTaste: boolean,
  category: number,
  result: Array<IRecommendList>
}

export interface ISongRes {
  code: number,
  data: Array<ISong>
}

export interface ISingersRes {
  code: number,
  more: boolean,
  artists: Array<ISinger>
}
