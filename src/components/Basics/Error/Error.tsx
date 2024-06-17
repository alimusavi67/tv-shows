import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{message}</span>
      </div>
    </div>
  );
};

export default Error;
