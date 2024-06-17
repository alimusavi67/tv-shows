import { useState, useEffect } from 'react';

const useRecentQueries = () => {
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  useEffect(() => {
    const savedQueries = JSON.parse(localStorage.getItem('recentQueries') || '[]');
    setRecentQueries(savedQueries);
  }, []);

  const saveQuery = (newQuery: string) => {
    let savedQueries = JSON.parse(localStorage.getItem('recentQueries') || '[]');
    if (!savedQueries.includes(newQuery) && newQuery.trim() !== '') {
      savedQueries = [newQuery, ...savedQueries.filter((q: string) => q !== newQuery)].slice(0, 5);
      localStorage.setItem('recentQueries', JSON.stringify(savedQueries));
      setRecentQueries(savedQueries);
    }
  };

  return { recentQueries, saveQuery };
};

export default useRecentQueries;
