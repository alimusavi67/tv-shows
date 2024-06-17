import React from 'react';

interface EmptyListProps {
  message: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <div className="text-center text-gray-600 max-w-md mx-auto">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A2 2 0 013 15.382V8.618a2 2 0 011.553-1.894L9 4m0 16l5.447 2.724A2 2 0 0015 21.382V14.618a2 2 0 00-1.553-1.894L9 10m0 16V10m0 0l5.447-2.724A2 2 0 0115 5.618V4.382a2 2 0 00-1.553-1.894L9 0"
          />
        </svg>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
};

export default EmptyList;
