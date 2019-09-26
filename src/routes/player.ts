import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const Player = loadable({
  loader: () => import('../views/player/Player'),
  loading: Loading
})

const routes: Array<IRouteConfig> = [
  { path: '/footer/:id', component: Player, exact: false }
]

export default routes
