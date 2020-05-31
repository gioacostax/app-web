/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import mobx, { api, counter } from 'src/mobx';
import { DownloadTo, Clear } from 'blink/icons/the-icon-of';

export default function Main() {
  const getData = () => {
    if (!api.loading) {
      counter.add(1);
      api.loadData('https://api.chucknorris.io/jokes/random')
        .then() // Handle sucessful promise
        .catch(); // Handle error promise
    } else api.cancelLoadData();
  };

  return mobx.useObserver(() => (
    <div id="main">
      <h1>Chuck Norris facts</h1>
      <button type="button" onClick={getData}>
        {
          api.loading
            ? <>LOADING...<Clear /></>
            : <>LOAD FACT<DownloadTo /></>
        }
      </button>
      <div className="fact">{api.data.value}</div>
      <div className="store-msg">{`Count: ${counter.count} - API Msg: ${api.status}`}</div>
    </div>
  ));
}
