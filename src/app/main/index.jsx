/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { useState } from 'react';
import { ThumbsUp, ArrowDownward } from 'blink/icons/the-icon-of';

export default function Main() {
  const [count, setCount] = useState(0);

  const handleScroller = () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="main">
      <button type="button" onClick={() => setCount(count + 1)}>
        {count} Likes
        <ThumbsUp />
      </button>
      <button type="button" className="scroller" onClick={handleScroller}>
        MobX Demo
        <ArrowDownward />
      </button>
    </div>
  );
}
