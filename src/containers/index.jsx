/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import redux, { store } from 'src/redux';

import ReduxContainer from './reduxDemo.jsx';

export Basic from './basicDemo.jsx';
export Router from './routerDemo.jsx';

const ReduxProvider = () => <redux.Provider store={store}><ReduxContainer /></redux.Provider>;
export const Redux = ReduxProvider;
