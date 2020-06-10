/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/redux';
import ReduxDemo from '../reduxDemo';
import Main from '../main';
import MobXDemo from '../mobXDemo';

export default function Router() {
  return (
    <HashRouter>
      <div className="router">
        <div id="links">
          <Link to="/">Main</Link>
          <Link to="/mobx">Mobx</Link>
          <Link to="/redux">Redux</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/mobx" component={MobXDemo} />
          <Route path="/redux">
            <Provider store={store}><ReduxDemo /></Provider>
          </Route>
          <Redirect from="*" to="/404.html" />
        </Switch>
      </div>
    </HashRouter>
  );
}
