import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(fetchFunction: () => Promise<AxiosResponse<T>>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const memoizedFetchFunction = useCallback(fetchFunction, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await memoizedFetchFunction();
        setState({ data: response.data, loading: false, error: null });
      } catch (error: any) {
        setState({ data: null, loading: false, error });
      }
    };

    fetchData();
  }, [memoizedFetchFunction]);

  return state;
};

export default useFetch;
