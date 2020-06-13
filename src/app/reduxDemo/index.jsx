/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import redux, { counter, api } from 'src/redux';
import { DownloadTo, Clear } from 'blink/icons/the-icon-of';

export default function ReduxDemo() {
  const store = redux.useSelector((states) => states);
  const dispatch = redux.useDispatch();

  const getData = () => {
    if (!store.api.loading) {
      dispatch(counter.add(1));
      dispatch(api.loadData('https://api.chucknorris.io/jokes/random'))
        .then() // Handle sucessful promise
        .catch(); // Handle error promise
    } else dispatch(api.cancelLoad());
  };

  return (
    <div id="redux-demo">
      <h2>Redux Demo</h2>
      <h1>Chuck Norris facts</h1>
      <button type="button" onClick={getData}>
        {
          store.api.loading
            ? <>LOADING...<Clear /></>
            : <>LOAD FACT<DownloadTo /></>
        }
      </button>
      <div className="fact">{store.api.data.value}</div>
      <div className="store-msg">{`Count: ${store.counter.count} - API Status: ${store.api.status}`}</div>
    </div>
  );
}
