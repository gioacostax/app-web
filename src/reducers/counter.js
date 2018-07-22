/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions types */
const ADD = 'ADD';
const REMOVE = 'REMOVE';

/* Initial State */
const initialState = { number: 0 };

/* Public Actions */
const add = () => ({ type: ADD });
const remove = () => ({ type: REMOVE });

export const actions = { add, remove };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        number: state.number + 1
      };
    }

    case REMOVE: {
      return {
        ...state,
        number: state.number - 1
      };
    }

    default: {
      return state;
    }
  }
};
