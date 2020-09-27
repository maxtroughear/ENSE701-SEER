import React from 'react';
import axios from 'axios';

import { buildRequest } from './API'

function useAPI(resource) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(function () {
    let isStopped = false

    if (!isStopped) {
      setLoading(true);
      axios.get(buildRequest(resource))
        .then(function (response) {
          setData(response.data);
          setLoading(false);
        }).catch(function (err) {
          setError(err);
        });
    }

    return () => {
      isStopped = true
    }
  }, [resource]);

  return { data, loading, error }
}

function useLazyAPI() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const makeRequest = (resource) => {
    let isStopped = false

    console.log('making request');

    if (!isStopped) {
      setLoading(true);
      axios.get(buildRequest(resource))
        .then(function (response) {
          setData(response.data);
          setLoading(false);
        }).catch(function (err) {
          setError(err);
        });
    }

    return () => {
      isStopped = true
    }
  }

  return [makeRequest, { data, loading, error }]
}

export {
  useAPI,
  useLazyAPI,
}
