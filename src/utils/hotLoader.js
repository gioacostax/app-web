/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

export default (Component) =>/* devblock:start */require('react-hot-loader/root').hot(Component)
|| /* devblock:end */Component;
