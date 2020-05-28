/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'mobx-react-lite/batchingForReactDom'; // https://github.com/mobxjs/mobx-react-lite/#observer-batching
import counter from './store/counter';
import database from './store/database';

// Observer para React Class y userObserver para Function
export { Observer, useObserver } from 'mobx-react-lite';
export default {
  counter,
  database
};
