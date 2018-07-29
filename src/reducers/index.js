/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux';
import reducerDatabase, { actions as database } from './database';

export {
  // Add actions here
  database
};

export default combineReducers({
  // Add reducers here
  database: reducerDatabase
});
