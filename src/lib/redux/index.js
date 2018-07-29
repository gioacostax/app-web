/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import connect from './connect';
import reducers from 'src/reducers';

/* devblock:start */
/* eslint import/no-extraneous-dependencies: 0 */
import { createLogger } from 'redux-logger';

const devEnhancers = [];
const logger = createLogger({
  duration: true,
  collapsed: true
});

devEnhancers.push(logger);
/* devblock:end */

const store = reduxCreateStore((state, action) => reducers(state, action),
  applyMiddleware(ReduxThunk, ReduxPromise/* devblock:start */, ...devEnhancers/* devblock:end */));

/* devblock:start */
/* eslint global-require: 0 */
if (module.hot) {
  module.hot.accept('src/reducers/index', () => {
    store.replaceReducer(require('src/reducers/index').default);
  });
}
/* devblock:end */

export { connect };
export default store;
