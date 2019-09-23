import React from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import loginRoutes from './login'
import mainRoutes from './main'
import recommendRoutes from './recommend'
import playerRoutes from './player'
import singersRoutes from './singers'

export interface IRouteConfig {
  path: string,
  component: (React.ComponentClass<any, any> & Loadable.LoadableComponent) | (React.FC<any> & Loadable.LoadableComponent),
  exact?: boolean
}

const routes = [
  ...loginRoutes,
  ...mainRoutes,
  ...recommendRoutes,
  ...playerRoutes,
  ...singersRoutes
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {
          routes.map((route, index) => (
            <Route key={ index } path={ route.path } component={ route.component } exact={ route.exact } />
          ))
        }
      </Switch>
    </BrowserRouter>
  )
};

export default Routes
