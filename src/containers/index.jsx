/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import MainContainer from './main.jsx';

// export const Main = hotLoader(MainContainer);
export const Main = /* devblock:start */require('react-hot-loader/root').hot(MainContainer)
|| /* devblock:end */MainContainer;
