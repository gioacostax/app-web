/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Actions Types */
const ADD = 'COUNTER.ADD';
const REMOVE = 'COUNTER.REMOVE';

/* Initial State */
const initialState = { count: 0 };

/* Public Actions */
const add = (num) => ({ type: ADD, num });
const remove = (num) => ({ type: REMOVE, num });

export const actions = { add, remove };

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        count: state.count + action.num
      };
    }

    case REMOVE: {
      return {
        ...state,
        count: state.count - action.num
      };
    }

    default: {
      return state;
    }
  }
};
