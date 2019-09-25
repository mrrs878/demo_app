import React, {createContext, Dispatch, useReducer} from 'react'

import { rootReducer, DEFAULT_STATE, IAction } from './reducer'
import * as types from './type'
import * as models from './model'

interface IContext {
  state: typeof DEFAULT_STATE,
  dispatch?: Dispatch<IAction>
}
const RootContext = createContext<IContext>({ state: DEFAULT_STATE});

interface IRootStoreProps {}
const RootStore: React.FC<IRootStoreProps> = props => {
  const [ state, dispatch ] = useReducer(rootReducer, DEFAULT_STATE);

  return (
    <RootContext.Provider value={ { state, dispatch } }>
      { props.children }
    </RootContext.Provider>
  )
};
export { RootContext, types, models }
export default RootStore
