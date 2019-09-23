export interface ITrack {
  name: string,
  id: number,
  ar: Array<ISinger>,
  dt: string
}

export interface IPlayList {
  name: string,
  playCount: number,
  coverImgUrl: string
  tracks: Array<ITrack>
}

export interface IListDetailRes {
  code: number,
  relatedVideos: object,
  playlist: IPlayList
}

export interface IBanner {
  imageUrl: string,
  url: string
}

export interface IRecommendList {
  id: string,
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

export interface ISong {
  id: number,
  url: string,
  type: string,
  size: number,
  level: string
}

export interface ISinger {
  id: number,
  img1v1Id: number,
  img1v1Url: string,
  followed: boolean,
  musicSize: number,
  albumSize: number,
  picId: number,
  picUrl: string
  name: string
}
