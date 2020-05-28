/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { observable, action } from 'mobx';

export default new class Counter {
  @observable count = 0;

  @action('[COUNTER.add]')
  add = (value) => {
    this.count += value;
  }
}();
