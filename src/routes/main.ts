import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const Main = loadable({
  loader: () => import('../views/main/Main'),
  loading:Loading
});
const Search = loadable({
  loader: () => import('../views/main/Search'),
  loading: Loading
});

const routes: Array<IRouteConfig> = [
  { path: '/', component: Main, exact: true },
  { path: '/main', component: Main, exact: true },
  { path: '/main/search', component: Search, exact: false }
];

export default routes
