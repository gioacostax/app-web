/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import mobx, { counter, api } from 'src/mobx';
import { Facts } from 'src/components';

export default function MobXDemo() {
  return mobx.useObserver(() => (
    <Facts
      name="MobX Demo"
      title="Chuck Norris Facts"
      counter={{
        add: () => counter.add(1),
        value: counter.count
      }}
      api={{
        loading: api.loading,
        load: () => api.loadData('https://api.chucknorris.io/jokes/random'),
        cancel: () => api.cancelLoadData(),
        value: api.data.value,
        status: api.status
      }}
    />
  ));
}
