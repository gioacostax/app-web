/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { bindActionCreators as bindAction } from 'redux';
import { connect } from 'react-redux';

/*
 * Require a Object with reducers
 *
 * Example: { reducer1, reducer2, ...}
 * Returns in component props something like props.state.<name-reducer>.<state>
 */
const statesToProps = keys => (state) => {
  const props = { state: {} };

  if (keys) {
    const reducers = Object.keys(keys);

    for (let x = 0; x < reducers.length; x++) {
      props.state[reducers[x]] = state[reducers[x]];
    }
  }

  return props;
};

/*
 * Require a Object with reducers
 *
 * Example: { reducer1, reducer2, ...}
 * Returns in component props something like props.actions.<name-reducer>.<action>
 */
const dispatchToProps = reducers => (dispatch) => {
  const props = { actions: {} };
  const keys = Object.keys(reducers);

  for (let x = 0; x < keys.length; x++) {
    const actions = Object.keys(reducers[keys[x]]);
    props.actions[keys[x]] = {};

    for (let y = 0; y < actions.length; y++) {
      props.actions[keys[x]][actions[y]] = bindAction(reducers[keys[x]][actions[y]], dispatch);
    }
  }

  return props;
};

/*
 * Export main function to use on React Components
 *
 * Example: import connect from 'connect';
 *          @connect(reducers...);
 */
export default reducers => connect(statesToProps(reducers), dispatchToProps(reducers));
