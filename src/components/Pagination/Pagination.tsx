import React from 'react';

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
  isLastPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage, isLastPage }) => {
  const pageNumbers = Array.from({ length: currentPage }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`px-3 py-1 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={isLastPage}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
