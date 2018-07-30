/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import Redux, { database, counter } from 'src/redux';
import { Loader } from 'src/components';

@Redux({ database, counter })
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: ''
    };

    this.getData = () => {
      this.setState({ result: '[app-Web] Cargando...' });
      this.props.counter.add(1);
      this.props.database.getData('/manifest.json').then((res) => {
        this.setState({ result: `[app-Web] Last action: ${res.type} OK.` });
      }).catch((err) => {
        this.setState({ result: `[app-Web] Error: ${err.message}` });
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
          <h3>REDUX (database.state)</h3>
          <div className="state-box">{JSON.stringify(this.props.database.state)}</div>
          {
            this.props.database.state.loading
              ? <Loader color="#888" />
              : (
                <button className="app-button" type="button" onClick={this.getData}>
                  {`GET DATA (${this.props.counter.state.count})`}
                </button>
              )
          }
          <div className="result-message">{this.state.result}</div>
        </div>
        <div id="app-footer">
          <h4>Made with <span className="heart">♥</span> by <a href="https://github.com/gioacostax">@gioacostax</a></h4>
        </div>
      </div>
    );
  }
}
