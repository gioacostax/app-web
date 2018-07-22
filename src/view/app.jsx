/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

/* ==================== REDUX =================== */
import { connect } from 'src/react/redux';
import { counter } from 'src/reducers';

@connect({ counter }, { counter })
/* ==================== REDUX ==================== */

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Counter: {this.props.counter.number}</h2>
        <button type="button" onClick={this.props.actions.counter.add}>Add</button>
        <button type="button" onClick={this.props.actions.counter.remove}>Remove</button>
      </div>
    );
  }
}
