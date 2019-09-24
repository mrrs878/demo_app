import { Singer, Song, PlayList } from "./model";
import * as types from './type'

const DEFAULT_STATE = {
  singer: new Singer(),
  singerArtists: [],
  song: new Song(),
  playList: new PlayList()
};

export interface IAction {
  type: types.allType,
  data?: any
}

function rootReducer(state = DEFAULT_STATE, action: IAction) {
  switch(action.type) {
    case types.SET_SINGER:
      return Object.assign(state, { singer: action.data });
    case types.SET_SONG:
      return Object.assign(state, { song: action.data });
    default:
      return state
  }
}

export { rootReducer, DEFAULT_STATE }
