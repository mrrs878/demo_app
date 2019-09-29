export type TGetListDetail = { id: string }

export type TGetSongURL = { id: string }

export type TGetSingers = {
  cat: string,
  initial: string
}

export type TGetSingerSongs = { id: string }

export type TGetLyric = { id: string }

export type TGetSearchSug = { keywords: string }
export type TGetSearchRes = { keywords: string }

export type TGetSongComment = { id: number, offset: number }
