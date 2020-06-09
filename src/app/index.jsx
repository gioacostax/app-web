/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import Main from './main';
import MobXDemo from './mobXDemo';

const App = () => <><Main /><MobXDemo /></>;

// eslint-disable-next-line global-require, import/no-extraneous-dependencies
export default /* devblock:start */require('react-hot-loader/root').hot(App)
|| /* devblock:end */App;
