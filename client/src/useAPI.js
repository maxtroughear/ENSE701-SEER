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
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const makeRequest = (resource) => {
    let isStopped = false
    setLoading(true);

    if (!isStopped) {
      setLoading(true);
      axios.get(buildRequest(resource))
        .then(function (response) {
          setData(response.data);
          setLoading(false);
        }).catch(function (err) {
          setError(err);
          setLoading(false);
        });
    }

    return () => {
      isStopped = true
    }
  }

  return [makeRequest, { data, loading, error }]
}

function useSubmitAPI(resource) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const makeRequest = (variables) => {
    let isStopped = false
    setLoading(true);

    if (!isStopped) {
      setLoading(true);
      axios.post(buildRequest(resource), {
        ...variables
      }).then(function (response) {
        setData(response.data);
        setLoading(false);
      }).catch(function (err) {
        setError(err);
        setLoading(false);
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
  useSubmitAPI,
}
