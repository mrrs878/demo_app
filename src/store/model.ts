import {IAl, IPlayer, IPlayList, IArtist, ITrack} from '../interfaces'
import {PlayMode} from "../constant";

class Singer implements IArtist {
  albumSize: number;
  followed: boolean;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;

  constructor(albumSize: number = NaN, followed: boolean = false, id: number = NaN, img1v1Id: number = NaN, img1v1Url: string = '', musicSize: number = NaN, name: string = '', picId: number = NaN, picUrl: string = '') {
    this.albumSize = albumSize;
    this.followed = followed;
    this.id = id;
    this.img1v1Id = img1v1Id;
    this.img1v1Url = img1v1Url;
    this.musicSize = musicSize;
    this.name = name;
    this.picId = picId;
    this.picUrl = picUrl;
  }
}

class Song implements ITrack {
  al: IAl;
  ar: Array<IArtist>;
  dt: string;
  id: number;
  name: string;

  constructor(al: IAl = { id:NaN, name: '', picUrl: '' }, ar: Array<IArtist> = [], dt: string = '', id: number = NaN, name: string = '') {
    this.al = al;
    this.ar = ar;
    this.dt = dt;
    this.id = id;
    this.name = name;
  }
}

class Player implements IPlayer {
  status: boolean;
  url: string;
  picUrl: string;
  currentTime: number;
  duration: number;
  mode: PlayMode;

  constructor(status: boolean = false, url: string = '', picUrl: string = '', currentTime: number = 0, duration: number = 0, mode: PlayMode = PlayMode.onByOne) {
    this.status = status;
    this.url = url;
    this.picUrl = picUrl;
    this.currentTime = currentTime;
    this.duration = duration;
    this.mode = mode
  }
}

class PlayList implements IPlayList {
  coverImgUrl: string;
  name: string;
  playCount: number;
  tracks: Array<ITrack>;

  constructor(coverImgUrl: string = '', name: string = '', playCount: number = NaN, tracks: Array<ITrack> = []) {
    this.coverImgUrl = coverImgUrl;
    this.name = name;
    this.playCount = playCount;
    this.tracks = tracks;
  }
}

export { Singer, Song, Player, PlayList }
