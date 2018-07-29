/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions types */
const FETCH_DATA = 'DATABASE.FETCH_DATA';
const PARSE_DATA = 'DATABASE.PARSE_DATA';
const STOP_LOADING = 'DATABASE.STOP_LOADING';

/* Initial State */
const initialState = {
  data: {},
  loading: false
};

/* Private Actions */
const parseData = (data, dispatch) => data.json().then(
  json => dispatch({ type: PARSE_DATA, data: json })
);

const fetchData = url => (dispatch) => {
  dispatch({ type: FETCH_DATA });
  return fetch(url)
    .then(res => parseData(res, dispatch))
    .catch((error) => {
      dispatch({ type: STOP_LOADING });
      throw error;
    });
};

/* Public Actions */
const getData = url => fetchData(url);

export const actions = { getData };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return { ...state, loading: true };
    }

    case PARSE_DATA: {
      return { ...state, data: action.data, loading: false };
    }

    case STOP_LOADING: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
};
