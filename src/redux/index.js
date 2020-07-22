/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as redux from 'react-redux';
import stores from './stores';

const store = createStore(
  stores,
  applyMiddleware(
    ReduxThunk
    /* devblock:start */
    // eslint-disable-next-line comma-style
    , require('redux-logger').createLogger({ duration: true, collapsed: true })
    /* devblock:end */
  )
);

/* devblock:start */
/* eslint global-require: 0 */
if (module.hot) {
  module.hot.accept('./stores/index', () => {
    store.replaceReducer(require('./stores/index').default);
  });
}
/* devblock:end */

export { store };
export * from './stores';
export default redux;
