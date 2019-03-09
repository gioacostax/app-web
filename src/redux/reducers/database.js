/**
 * Copyright © 2015-2019 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions types */
const FETCH_DATA = 'DATABASE.FETCH_DATA';
const PARSE_DATA = 'DATABASE.PARSE_DATA';
const SET_DATA = 'DATABASE.SET_DATA';
const STOP = 'DATABASE.STOP';

/* Initial State */
const initialState = {
  data: {},
  loading: false,
  status: '[app-Web.redux.database] Ready.'
};

/* Private Actions */
const fetchData = url => (dispatch) => {
  dispatch({ type: FETCH_DATA });
  fetch(url)
    .then((raw) => {
      if (!raw.ok) throw Error(raw.statusText);
      dispatch({ type: PARSE_DATA });
      return raw.json();
    })
    .then(json => dispatch({ type: SET_DATA, data: json }))
    .catch((error) => {
      dispatch({ type: STOP, reason: error });
    });
};

/* Public Actions */
const getData = url => fetchData(url);

export const actions = { getData };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state, loading: true, status: '[app-Web.redux.database] LOADING...'
      };
    }

    case PARSE_DATA: {
      return {
        ...state, status: '[app-Web.redux.database] PARSING...'
      };
    }

    case SET_DATA: {
      return {
        ...state,
        data: action.data,
        loading: false,
        status: '[app-Web.redux.database] OK.'
      };
    }

    case STOP: {
      return {
        ...state, loading: false, status: `[app-Web.redux.database] FAIL - ${action.reason}`
      };
    }

    default: {
      return state;
    }
  }
};
