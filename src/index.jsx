/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles/index.scss';

import { Provider } from 'react-redux';
import store from 'src/lib/redux';
import App from 'src/app';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

/* devblock:start */
/* eslint import/no-extraneous-dependencies: 0 */
// React Hot Loader
require('react-hot-loader').hot(module)(App);
/* devblock:end */
