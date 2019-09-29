//recommend
import {EPlayMode} from "../constant";

export interface IAl {
  id: number,
  name: string,
  picUrl: string
}
export interface ITrack {
  name: string,
  id: number,
  ar: Array<IArtist>,
  al: IAl,
  dt: string
}
export interface IPlayList {
  name: string,
  playCount: number,
  coverImgUrl: string
  tracks: Array<ITrack>
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

export interface ISingerHotSong {
  ar: Array<{ id: number, name: string }>,
  al: {
    id: number,
    name: string,
    picUrl: string
  },
  id: number,
  dt: number,
  name: string
}

export interface IArtist {
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

export interface IAlbum {
  id: number,
  name: string,
  size: number,
  blurPicUrl: string,
  picUrl: string,
  artist: IArtist
}

export interface IPlayer {
  url: string,
  status: boolean,
  picUrl: string,
  currentTime: number,
  duration: number,
  mode: EPlayMode
}

export interface ISearchResult {
  song: {
    moreText: string,
    songs: Array<ITrack>
  },
  artist: {
    moreText: string,
    artists: Array<IArtist>
  },
  album: {
    moreText: string,
    albums: Array<IAlbum>
  }
}

export interface ITrackComment {
  content: string
}
