import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div data-testid="skeleton" className={`w-full h-40 bg-gray-300 animate-pulse ${className}`}></div>
);

export default Skeleton;
