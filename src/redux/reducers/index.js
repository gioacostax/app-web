/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux';
import database from './database';
import counter from './counter';

export { actions as database } from './database';
export { actions as counter } from './counter';

export default combineReducers({
  database,
  counter
});
