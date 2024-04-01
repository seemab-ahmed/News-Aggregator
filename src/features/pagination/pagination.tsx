import React from 'react';
import { useRecoilState } from 'recoil';
import { searchNewsAtom } from '../../atoms/searchNewsAtom';

export const Pagination = () => {
  const [searchNews, setSearchNews] = useRecoilState(searchNewsAtom);

  const goToNextPage = () => {
    setSearchNews((prevSearchNews) => ({
      ...prevSearchNews,
      pageNumber: prevSearchNews.pageNumber + 1,
    }));
  };

  const goToPrevPage = () => {
    setSearchNews((prevSearchNews) => ({
      ...prevSearchNews,
      pageNumber: prevSearchNews.pageNumber - 1,
    }));
  };

  return (
    <div className="flex justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-l focus:outline-none"
        onClick={goToPrevPage}
        disabled={searchNews.pageNumber === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r focus:outline-none"
        onClick={goToNextPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

