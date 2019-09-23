import React, {createContext, Dispatch, useReducer} from 'react'

import { rootReducer, DEFAULT_STATE } from './reducer'
import * as actions from './action'

interface IContext {
  state: typeof DEFAULT_STATE,
  dispatch?: Dispatch<actions.IAction>
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
export { RootContext, actions }
export default RootStore
