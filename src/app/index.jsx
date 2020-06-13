/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/redux';
import { Scroller } from 'src/components';
import ReduxDemo from './reduxDemo';
import Main from './main';
import MobXDemo from './mobXDemo';

const App = () => (
  <>
    <Scroller />
    <Main />
    <MobXDemo />
    <Provider store={store}><ReduxDemo /></Provider>
  </>
);

// eslint-disable-next-line global-require, import/no-extraneous-dependencies
export default /* devblock:start */require('react-hot-loader/root').hot(App)
|| /* devblock:end */App;
