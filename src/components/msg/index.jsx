/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';

export default React.memo(function Msg({ countValue, statusValue }) {
  return <div className="msg">{`Count: ${countValue} - API Status: ${statusValue}`}</div>;
});
