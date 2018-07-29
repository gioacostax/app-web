/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

export default props => (
  <div className="app-loader">
    <div style={{ background: props.color || '#888' }} className="bar b1" />
    <div style={{ background: props.color || '#888' }} className="bar b2" />
    <div style={{ background: props.color || '#888' }} className="bar b3" />
    <div style={{ background: props.color || '#888' }} className="bar b4" />
    <div style={{ background: props.color || '#888' }} className="bar b5" />
    <div style={{ background: props.color || '#888' }} className="bar b6" />
  </div>
);
