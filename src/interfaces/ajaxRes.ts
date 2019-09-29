import {
  IBanner,
  IRecommendList,
  IPlayer,
  IArtist,
  ISingerHotSong,
  IPlayList,
  ISearchResult,
  ITrackComment
} from './index'

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
  artists: Array<IArtist>
}

export interface ISingerSongsRes {
  code: number,
  artist: IArtist,
  hotSongs: Array<ISingerHotSong>,
  more: boolean
}

export interface ILyricRes {
  code: number;
  lrc: {
    lyric: string
  };
}

export interface ISearchRes {
  code: number,
  result: ISearchResult
}

export interface ISearchSugRes {
  code: number,
  result: {
    allMatch: Array<{keyword: string}>
  }
}

export interface IGetTrackCommentsRes {
  code: number,
  total: number,
  comments: Array<ITrackComment>
}
