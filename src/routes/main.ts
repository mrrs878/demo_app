import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const Main = loadable({
  loader: () => import('../views/main/Main'),
  loading:Loading
})
const Recommend = loadable({
  loader: () => import('../views/recommend/Recommend'),
  loading: Loading
})

const routes: Array<IRouteConfig> = [
  { path: '/main', component: Main, exact: true },
  { path: '/main/recommend', component: Recommend, exact: true }
]

export default routes