import loadable from 'react-loadable'

import Loading from '../components/m-loading/Loading'
import { IRouteConfig } from './index'

const Login = loadable({
  loader: () => import('../views/login/Login'),
  loading: Loading
});

const Register = loadable({
  loader: () => import('../views/login/Register'),
  loading: Loading
});

const routes: Array<IRouteConfig> = [
  { path: '/login/login', component: Login, exact: true },
  { path: '/login/register', component: Register, exact: true }
];

export default routes
