import { IBanner, IRecommendList } from './index'

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