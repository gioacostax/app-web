/**
 * Copyright © 2015-2019 gioacostax. All rights reserved.
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
 * Returns in component props something like props.<name-reducer>.state.<state>
 */
const stateToProps = reducers => (state) => {
  const props = {};
  const keys = Object.keys(reducers);

  for (let x = 0; x < keys.length; x++) {
    props[keys[x]] = { state: state[keys[x]] };
  }

  return props;
};

/*
 * Require a Object with reducers
 *
 * Example: { reducer1, reducer2, ...}
 * Returns in component props something like props.<name-reducer>.<action>
 */
const actionsToProps = reducers => (dispatch) => {
  const props = {};
  const keys = Object.keys(reducers);

  for (let x = 0; x < keys.length; x++) {
    const actions = Object.keys(reducers[keys[x]]);

    for (let y = 0; y < actions.length; y++) {
      props[keys[x]] = {
        ...props[keys[x]],
        [actions[y]]: bindAction(reducers[keys[x]][actions[y]], dispatch)
      };
    }
  }
  return props;
};

/*
 * Merge State and Actions in one props object <reducer>.
 */
const mergeProps = () => (state, actions) => {
  const props = {};
  const keys = Object.keys(state);

  for (let x = 0; x < keys.length; x++) {
    props[keys[x]] = { state: state[keys[x]].state, ...actions[keys[x]] };
  }

  return props;
};

/*
 * Export main function to use on React Components
 *
 * Example: import Redux, { reducer1, reducer2, ... } from 'src/redux';
 *          @Redux({ reducer1 , reducer2, ... });
 */
export default reducers => connect(
  stateToProps(reducers),
  actionsToProps(reducers),
  mergeProps()
);
