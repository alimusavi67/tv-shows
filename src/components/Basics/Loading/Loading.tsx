import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      <p className="ml-4 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
