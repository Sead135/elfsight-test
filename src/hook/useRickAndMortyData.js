import { useEffect, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character';

function objectToURLParams(obj) {
  const urlParams = [];
  for (const param of obj) {
    urlParams.push(
      `${encodeURIComponent(param.type)}=${encodeURIComponent(param.value)}`
    );
  }
  return urlParams.join('&');
}

export const useRickAndMortyData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      if (response.status !== 404 && jsonData?.length !== 0) {
        setData((prevData) => [...prevData, ...jsonData.results]);
        setNextPage(jsonData.info.next);
      } else {
        setData([]);
        setNextPage('');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData(`${API_URL}?page=1`);
  }, []);

  const loadNextPage = () => {
    if (nextPage) {
      setLoading(true);
      fetchData(nextPage);
    }
  };

  const filterData = (value) => {
    setData([]);
    setLoading(true);
    if (value === 'clear-all') {
      fetchData(`${API_URL}?page=1`);
      return;
    }
    const params = objectToURLParams(value);
    const newURL = `${API_URL}?${params}`;
    fetchData(newURL);
  };

  return { data, isLoading, isNextPage: nextPage, loadNextPage, filterData };
};
