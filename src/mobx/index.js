/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom';
import * as mobx from 'mobx-react-lite';

// stores
import counter from './stores/counter';
import api from './stores/api';

export default mobx;
export {
  counter,
  api
};
