import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const RecommendDetail = loadable({
  loader: () => import('../views/recommend/RecommendDetail'),
  loading: Loading
})

const routes: Array<IRouteConfig> = [
  { path: '/recommend/:id', component: RecommendDetail, exact: false }
]

export default routes