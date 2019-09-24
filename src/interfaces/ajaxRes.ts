import {IBanner, IRecommendList, IPlayer, ISinger, ISingerHotSong, IPlayList} from './index'

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


export interface IListDetailRes {
  code: number,
  relatedVideos: object,
  playlist: IPlayList
}
export interface ISongRes {
  code: number,
  data: Array<IPlayer>
}

export interface ISingersRes {
  code: number,
  more: boolean,
  artists: Array<ISinger>
}

export interface ISingerSongsRes {
  code: number
  artist: ISinger,
  hotSongs: Array<ISingerHotSong>,
  more: boolean
}
