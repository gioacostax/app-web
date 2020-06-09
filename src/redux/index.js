/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as redux from 'react-redux';
import reducers from 'src/redux/reducers';

const store = createStore(
  reducers,
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
  module.hot.accept('src/redux/reducers/index', () => {
    store.replaceReducer(require('src/redux/reducers/index').default);
  });
}
/* devblock:end */

export { store };
export * from 'src/redux/reducers';
export default redux;
