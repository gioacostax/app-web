/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Quote, Msg } from 'src/components';
import { DownloadTo, Clear } from 'blink/icons/the-icon-of';

export default function Facts({ name, title, api, counter }) {
  const getData = () => {
    if (!api.loading) {
      counter.add();
      api
        .load()
        .then() // Handle sucessful promise
        .catch(); // Handle error promise
    } else api.cancel();
  };

  return (
    <div className="container">
      <h2>{name}</h2>
      <h1>{title}</h1>
      <button type="button" onClick={getData}>
        {api.loading ? (
          <>
            LOADING...
            <Clear />
          </>
        ) : (
          <>
            LOAD FACT
            <DownloadTo />
          </>
        )}
      </button>
      <Quote value={api.value} />
      <Msg countValue={counter.value} statusValue={api.status} />
    </div>
  );
}
