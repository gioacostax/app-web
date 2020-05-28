/** license react-kit
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { useState } from 'react';
import { Send } from '@react-icons/the-icon-of';

export default function Main() {
  const [count, setCount] = useState(0);

  return (
    <div id="main">
      <button type="button" onClick={() => setCount(count + 1)}>
        {`COUNT (${count})`}
        <Send />
      </button>
    </div>
  );
}
