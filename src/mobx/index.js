/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom';
import * as mobx from 'mobx-react-lite';

// Stores
export counter from './stores/counter';
export api from './stores/api';

// Export mobx-react-lite tools as default
export default mobx;
