import {Singer, Song, PlayList, Player} from "./model";
import * as types from './type'

import { PlayMode } from '../constant'

const DEFAULT_STATE = {
  singer: new Singer(),
  singerArtists: [],
  song: new Song(),
  playingIndex: NaN,
  playList: new PlayList(),
  playMode: PlayMode.onByOne,
  playStatus: false,
  player: new Player()
};

export interface IAction {
  type: types.allType,
  data?: any
}

function rootReducer(state = DEFAULT_STATE, action: IAction) {
  switch(action.type) {
    case types.SET_SINGER:
      return Object.assign({}, state, { singer: action.data });
    case types.SET_SONG:
      return Object.assign({}, state, { song: action.data });
    case types.SET_PLAYING_INDEX:
      return Object.assign({}, state, { playingIndex: action.data });
    case types.SET_PLAY_LIST:
      return Object.assign({}, state, { playList: action.data });
    case types.SET_PLAY_STATUS:
      return Object.assign({}, state, { playStatus: action.data });
    case types.SET_PLAY_MODE:
      return Object.assign({}, state, { playMode: action.data });
    case types.SET_PLAYER:
      return Object.assign({}, state, { player: Object.assign({}, state.player, action.data) });
    default:
      return state
  }
}

export { rootReducer, DEFAULT_STATE }
