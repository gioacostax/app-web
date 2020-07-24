/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import redux, { store } from 'src/redux';

import ReduxContainer from './reduxDemo.jsx';
import BasicContainer from './basicDemo.jsx';
import MobXContainer from './mobXDemo.jsx';
import RouterContainer from './routerDemo.jsx';

export const Basic = /* devblock:start */require('react-hot-loader/root').hot(BasicContainer)
|| /* devblock:end */BasicContainer;

const ReduxProvider = () => <redux.Provider store={store}><ReduxContainer /></redux.Provider>;
export const Redux = /* devblock:start */require('react-hot-loader/root').hot(ReduxProvider)
|| /* devblock:end */ReduxProvider;

export const MobX = /* devblock:start */require('react-hot-loader/root').hot(MobXContainer)
|| /* devblock:end */MobXContainer;

export const Router = /* devblock:start */require('react-hot-loader/root').hot(RouterContainer)
|| /* devblock:end */RouterContainer;
