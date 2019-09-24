import {ISinger, ITrack, IAl, IPlayer, IPlayList} from '../interfaces'

class Singer implements ISinger {
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
  ar: Array<ISinger>;
  dt: string;
  id: number;
  name: string;

  constructor(al: IAl = { id:NaN, name: '', picUrl: '' }, ar: Array<ISinger> = [], dt: string = '', id: number = NaN, name: string = '') {
    this.al = al;
    this.ar = ar;
    this.dt = dt;
    this.id = id;
    this.name = name;
  }
}

class Player implements IPlayer {
  id: number;
  level: string;
  picUrl: string;
  size: number;
  type: string;
  url: string;

  constructor(id: number = NaN, level: string = '', picUrl: string = '', size: number = NaN, type: string = '', url: string = '') {
    this.id = id;
    this.level = level;
    this.picUrl = picUrl;
    this.size = size;
    this.type = type;
    this.url = url;
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
