import React, { createContext } from 'react'

import { IRecommendList } from '../interfaces/index'

export const RootContext = createContext({})

export interface IRootStoreProps {}

const RootStore: React.FC<IRootStoreProps> = props => {
  return (
    <RootContext.Provider value={{}}>
      { props.children }
    </RootContext.Provider>
  )
}

export default RootStore