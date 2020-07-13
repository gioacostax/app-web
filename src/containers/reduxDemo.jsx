/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import redux, { counter, api } from 'src/redux';
import { Facts } from 'src/components';

export default function ReduxDemo() {
  const store = redux.useSelector((states) => states);
  const dispatch = redux.useDispatch();

  return (
    <Facts
      name="Redux Demo"
      title="Chuck Norris Facts"
      counter={{
        add: () => dispatch(counter.add(1)),
        value: store.counter.count
      }}
      api={{
        loading: store.api.loading,
        load: () => dispatch(api.loadData('https://api.chucknorris.io/jokes/random')),
        cancel: () => dispatch(api.cancelLoad()),
        value: store.api.data.value,
        status: store.api.status
      }}
    />
  );
}
