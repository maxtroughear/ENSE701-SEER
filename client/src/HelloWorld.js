import React from 'react';

import useAPI from './useAPI';

function HelloWorld() {
  const [data, loading] = useAPI('/mongo');

  return (
    <div>
      { loading
        ? <p>loading...</p>
        : <div>
          <p>{data.message}</p>
        </div>
      }
    </div>
  );
}

export default HelloWorld;
