import {Singer} from "./model";
import * as actions from './action'
import * as types from './type'

const DEFAULT_STATE = {
  singer: new Singer()
};

function rootReducer(state = DEFAULT_STATE, action: actions.IAction) {
  switch(action.type) {
    case types.SET_SINGER:
      return Object.assign(state, { singer: action.data })
    default:
      return state
  }
}

export { rootReducer, DEFAULT_STATE }
