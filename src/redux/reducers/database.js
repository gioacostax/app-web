/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions types */
const FETCH_DATA = 'DATABASE.FETCH_DATA';
const SET_DATA = 'DATABASE.SET_DATA';
const STOP = 'DATABASE.STOP';

/* Initial State */
const initialState = {
  data: {},
  loading: false,
  controller: null,
  error: null,
  status: '[DATABASE] READY.'
};

/* Private Actions */
const fetchData = (url) => async (dispatch) => {
  const controller = new AbortController();
  dispatch({ controller, type: FETCH_DATA });
  try {
    const params = { signal: controller.signal };
    const raw = await fetch(url, params);
    const json = await raw.json();
    dispatch({ type: SET_DATA, data: json });
  } catch (error) {
    // Si el error NO es por cancelación...
    if (error.code !== 20) {
      dispatch({ type: STOP, reason: error.message, error });
    }
  }
};

const stopGetData = () => (dispatch, getState) => {
  if (getState().database.controller) {
    getState().database.controller.abort();
    dispatch({ type: STOP, reason: 'CANCEL BY THE USER', error: null });
  }
};

/* Public Actions */
const loadData = (url) => fetchData(url);
const cancelLoadData = () => stopGetData();

export const actions = { loadData, cancelLoadData };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state,
        loading: true,
        error: null,
        controller: action.controller,
        status: '[DATABASE.FETCH_DATA] ASYNC:WORKING...'
      };
    }

    case SET_DATA: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null,
        controller: null,
        status: '[DATABASE.SET_DATA] DONE'
      };
    }

    case STOP: {
      return {
        ...state,
        loading: false,
        controller: null,
        status: `[DATABASE.STOP] REASON: ${action.reason}`,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
};
