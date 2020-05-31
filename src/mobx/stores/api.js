/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { observable, action, runInAction } from 'mobx';

export default new class Database {
  @observable status = 'Ready';
  @observable loading = false;
  @observable data = {};
  controller = null;
  error = null

  @action('API.LOAD_DATA')
  loadData = async (url) => {
    try {
      this.loading = true;
      this.status = 'Fetching data...';
      this.controller = new AbortController();
      this.error = null;
      const raw = await fetch(url, { signal: this.controller.signal });
      const json = await raw.json();
      return runInAction('API.SET_DATA', () => {
        this.data = json;
        this.loading = false;
        this.status = 'Data loaded';
      });
    } catch (error) {
      // If the error is not due to cancellation
      if (error.code !== 20) {
        return runInAction('API.STOP', () => {
          this.status = error.message;
          this.loading = false;
          this.error = error;
        });
      }
      return error;
    }
  };

  @action('API.CANCEL_LOAD')
  cancelLoadData = () => {
    if (this.controller) {
      this.controller.abort();
      this.loading = false;
      this.status = 'Canceled by user';
    }
  };
}();
