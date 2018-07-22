/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { bindActionCreators as bindAction } from 'redux';
import { connect } from 'react-redux';

/*
 * Require a String Array as param with the name of the Store
 *
 * Example: ['store1', 'store2', ...]
 */
const statesToProps = keys => (state) => {
  const props = {};

  if (keys) {
    const reducers = Object.keys(keys);

    for (let x = 0; x < reducers.length; x++) {
      props[reducers[x]] = state[reducers[x]];
    }
  }

  return props;
};

/*
 * Require an Object Array as param with the Action (Function)
 *
 * Example: [action1, action2, ...]
 */
const dispatchToProps = keys => (dispatch) => {
  const props = { actions: {} };
  const redus = Object.keys(keys);

  for (let x = 0; x < redus.length; x++) {
    const actions = Object.keys(keys[redus[x]]);

    for (let y = 0; y < actions.length; y++) {
      props.actions[redus[x]] = { ...props.actions[redus[x]] };
      props.actions[redus[x]][actions[y]] = bindAction(keys[redus[x]][actions[y]], dispatch);
    }
  }

  return props;
};

/*
 * Export main function to use on React Components
 *
 * Example: import connect from 'connect';
 *          @connect(states..., actions...);
 */
export default (states, actions) => connect(statesToProps(states), dispatchToProps(actions));
