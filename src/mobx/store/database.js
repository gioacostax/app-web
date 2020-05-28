/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { observable, action, runInAction } from 'mobx';

export default new class Database {
  @observable status = '[DATABASE.loadData] READY.';
  @observable loading = false;
  @observable data = {};
  controller = null;
  error = null

  @action('[DATABASE.loadData] ASYNC WORKING...')
  loadData = async (url) => {
    try {
      this.loading = true;
      this.status = '[DATABASE.loadData] ASYNC WORKING...';
      this.controller = new AbortController();
      this.error = null;
      const params = { signal: this.controller.signal };
      const raw = await fetch(url, params);
      const json = await raw.json();
      runInAction('[DATABASE.loadData] ASYNC DONE', () => {
        this.status = '[DATABASE.loadData] ASYNC DONE';
        this.data = json;
        this.loading = false;
      });
    } catch (error) {
      // Si el error NO es por cancelación...
      if (error.code !== 20) {
        runInAction('[DATABASE.loadData] ASYNC ERROR', () => {
          this.status = '[DATABASE.loadData] ASYNC ERROR';
          this.loading = false;
          this.error = error.message;
        });
      }
    }
  };

  @action('[DATABASE.cancelLoadData]')
  cancelLoadData = () => {
    if (this.controller) {
      this.status = '[DATABASE.cancelLoadData]';
      this.controller.abort();
      this.loading = false;
    }
  };
}();
