/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { observable, action } from 'mobx';

export default new class Counter {
  @observable count = 0;

  @action('COUNTER.ADD')
  add = (value) => {
    this.count += value;
  }

  @action('COUNTER.REMOVE')
  remove = (value) => {
    this.count -= value;
  }
}();
