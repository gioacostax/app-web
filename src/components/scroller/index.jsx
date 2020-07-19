/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { ArrowDownward } from '@gioacostax/icons';
import React from 'react';

export default function Scroller() {
  const handleScroller = () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button type="button" className="scroller" onClick={handleScroller}>
      Next
      <ArrowDownward />
    </button>
  );
}
