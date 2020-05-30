/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import STORE, { useObserver } from 'src/mobx';
import { Send } from 'blink/icons/the-icon-of';


export default function Main() {
  const getData = (e) => {
    if (!STORE.database.loading) {
      STORE.counter.add(1);
      STORE.database.loadData('/manifest.json');
    } else STORE.database.cancelLoadData();
    e.preventDefault();
  };

  return useObserver(() => (
    <div id="main">
      <div className="state-box">{JSON.stringify(STORE.database.data)}</div>
      <button type="button" onClick={getData}>
        {
          STORE.database.loading
            ? 'loading...'
            : `GET DATA (${STORE.counter.count})`
        }
        <Send />
      </button>
      <div className="result-message">{STORE.database.status}</div>
    </div>
  ));
}
