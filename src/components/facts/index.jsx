/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import { DownloadTo, Clear } from '@gioacostax/icons';
import { Quote, Msg, Button } from 'src/components';

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
    <div className="container facts">
      <h2>{name}</h2>
      <h1>{title}</h1>
      <Button onClick={getData}>
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
      </Button>
      <Quote value={api.value} />
      <Msg countValue={counter.value} statusValue={api.status} />
    </div>
  );
}
