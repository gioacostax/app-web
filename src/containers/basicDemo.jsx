/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ThumbsUp } from 'blink/icons/the-icon-of';

export default function BasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <button type="button" onClick={() => setCount(count + 1)}>
        {count} Likes
        <ThumbsUp />
      </button>
    </div>
  );
}
