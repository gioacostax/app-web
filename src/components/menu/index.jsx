/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';

export default React.memo(function Menu({ children }) {
  return <div className="menu">{children}</div>;
});
