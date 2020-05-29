/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { Send } from '@react-icons/the-icon-of';
import redux, { counter, database } from 'src/redux';

export default function Main() {
  const STORE = redux.useSelector((store) => store);
  const dispatch = redux.useDispatch();

  const getData = (e) => {
    if (!database.loading) {
      dispatch(counter.add(1));
      dispatch(database.loadData('/manifest.json'));
    } else dispatch(database.cancelLoadData());
    e.preventDefault();
  };

  return (
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
  );
}
