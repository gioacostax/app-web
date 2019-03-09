/**
 * Copyright © 2015-2019 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.addCount = () => {
      /* eslint arrow-body-style: 0 */
      this.setState((state) => {
        return { count: state.count + 1 };
      });
    };
  }

  render() {
    return (
      <div className="container">
        <div id="app-header">
          <h1><span className="app-style">app</span>-Web</h1>
        </div>
        <div id="app-body">
          <button className="app-button" type="button" onClick={this.addCount}>
            {`COUNT (${this.state.count})`}
          </button>
        </div>
        <div id="app-footer">
          <h4>Made with <span className="heart">♥</span> by <a href="https://www.giorgio.work">Giorgio.work</a></h4>
        </div>
      </div>
    );
  }
}
