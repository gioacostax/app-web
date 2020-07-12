/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import React from 'react';
import redux, { store } from 'src/redux';
import ReduxDemo from './reduxDemo.jsx';
import BasicDemo from './basicDemo.jsx';
import MobXDemo from './mobXDemo.jsx';

const BasicContainer = () => <BasicDemo />;
const ReduxContainer = () => <redux.Provider store={store}><ReduxDemo /></redux.Provider>;
const MobXContainer = () => <MobXDemo />;

export const Basic = /* devblock:start */require('react-hot-loader/root').hot(BasicContainer)
|| /* devblock:end */BasicContainer;
export const Redux = /* devblock:start */require('react-hot-loader/root').hot(ReduxContainer)
|| /* devblock:end */ReduxContainer;
export const MobX = /* devblock:start */require('react-hot-loader/root').hot(MobXContainer)
|| /* devblock:end */MobXContainer;
