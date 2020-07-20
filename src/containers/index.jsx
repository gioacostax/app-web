/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import React from 'react';
import { hotLoader } from 'src/utils';

import redux, { store } from 'src/redux';
import ReduxDemo from './reduxDemo.jsx';
import BasicDemo from './basicDemo.jsx';
import MobXDemo from './mobXDemo.jsx';
import RouterDemo from './routerDemo.jsx';

export const Basic = hotLoader(BasicDemo);
export const Redux = hotLoader(() => <redux.Provider store={store}><ReduxDemo /></redux.Provider>);
export const MobX = hotLoader(MobXDemo);
export const Router = hotLoader(RouterDemo);
