/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions Types */
const FETCH_DATA = 'API.FETCH_DATA';
const SET_DATA = 'API.SET_DATA';
const STOP = 'API.STOP';

/* Initial State */
const initialState = {
  data: {},
  loading: false,
  controller: null,
  error: null,
  status: 'Ready'
};

/* Public Actions */
const loadData = (url) => async (dispatch) => {
  // Assign fetch controller
  const controller = new AbortController();
  dispatch({ type: FETCH_DATA, controller });

  try {
    // Execute fetch
    const raw = await fetch(url, { signal: controller.signal });
    const json = await raw.json();
    return dispatch({ type: SET_DATA, data: json });
  } catch (error) {
    // If the error is not due to cancellation
    if (error.code !== 20) return dispatch({ type: STOP, msg: error.message, error });
    return { type: STOP, msg: 'Canceled by user', error: null };
  }
};

const cancelLoad = () => (dispatch, getState) => {
  if (getState().api.controller) {
    getState().api.controller.abort();
    dispatch({ type: STOP, msg: 'Canceled by user', error: null });
  }
  dispatch({ type: STOP, msg: 'Ready', error: null });
};

export const actions = { loadData, cancelLoad };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state,
        loading: true,
        error: null,
        controller: action.controller,
        status: 'Fetching data...'
      };
    }

    case SET_DATA: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null,
        controller: null,
        status: 'Data loaded'
      };
    }

    case STOP: {
      return {
        ...state,
        loading: false,
        controller: null,
        status: `${action.msg}`,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
};
