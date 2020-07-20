/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Basic, Redux, MobX } from 'src/containers';
import { Menu } from 'src/components';

export default function Router() {
  return (
    <HashRouter>
      <div style={{ display: 'flex' }}>
        <Menu>
          <Link replace to="/">BASIC</Link>
          <Link replace to="/mobx">MOBX</Link>
          <Link replace to="/redux">REDUX</Link>
        </Menu>
        <Switch>
          <Route exact path="/" component={Basic} />
          <Route exact path="/mobx" component={MobX} />
          <Route exact path="/redux" component={Redux} />
          <Redirect from="*" to="/404.html" />
        </Switch>
      </div>
    </HashRouter>
  );
}
