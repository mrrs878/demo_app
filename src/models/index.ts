import {IAlbum, IArtist, ISearchResult, ITrack} from "../interfaces"

class SearchResult implements ISearchResult {
  album: { moreText: string; albums: Array<IAlbum> };
  artist: { moreText: string; artists: Array<IArtist> };
  song: { moreText: string; songs: Array<ITrack> };

  constructor(album: { moreText: string; albums: Array<IAlbum> }, artist: { moreText: string; artists: Array<IArtist> }, song: { moreText: string; songs: Array<ITrack> }) {
    this.album = album;
    this.artist = artist;
    this.song = song;
  }
}

export { SearchResult }
