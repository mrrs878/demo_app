import * as types from './type'
import { ISinger } from '../interfaces'

export interface IAction {
  type: types.allType,
  data?: any
}

export function setSinger(data: ISinger): IAction {
  return {
    type: types.SET_SINGER,
    data
  }
}
