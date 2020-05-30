/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import redux, { counter, api } from 'src/redux';
import { DownloadTo, Clear } from 'blink/icons/the-icon-of';

export default function Main() {
  const STORE = redux.useSelector((store) => store);
  const dispatch = redux.useDispatch();

  const getData = (e) => {
    if (!api.loading) {
      dispatch(counter.add(1));
      dispatch(api.loadData('https://api.chucknorris.io/jokes/random'));
    } else dispatch(api.cancelLoadData());
    e.preventDefault();
  };

  return (
    <div id="main">
      <h1>Chuck Norris facts</h1>
      <button type="button" onClick={getData}>
        {
          STORE.api.loading
            ? <>FETCHING...<Clear /></>
            : <>FETCH FACT<DownloadTo /></>
        }
      </button>
      <div className="joke">{STORE.api.data.value}</div>
      <div className="result-message">{`Count: ${STORE.counter.count} - API Msg: ${STORE.api.status}`}</div>
    </div>
  );
}
