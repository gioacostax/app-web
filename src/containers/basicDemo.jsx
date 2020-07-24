/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ThumbsUp } from '@gioacostax/icons';
import { Button } from 'src/components';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  flex: 1
};

export default function BasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ ...styles }}>
      <Button onClick={() => setCount(count + 1)}>
        {count} Likes
        <ThumbsUp />
      </Button>
    </div>
  );
}
