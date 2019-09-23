import { ISinger } from '../interfaces/index'

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

export { Singer }
