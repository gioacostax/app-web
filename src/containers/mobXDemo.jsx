/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import observer, { counter, api } from 'src/mobx';
import { Facts } from 'src/components';

export default observer(function MobXDemo() {
  return (
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
  );
});
