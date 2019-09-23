import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const SingerDetail = loadable({
  loader: () => import('../views/singers/SingerDetail'),
  loading: Loading
});

const routes: Array<IRouteConfig>= [
  { path: "/singerDetail/:id", component: SingerDetail, exact: false }
];

export default routes
