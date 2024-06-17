import React from 'react';

interface DefaultImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

const DefaultImage: React.FC<DefaultImageProps> = ({ src, alt, className = '' }) => (
  <img
    src={src || '/no-image.jpg'}
    alt={alt}
    data-testid="skeleton"
    className={`w-full rounded h-40 object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
  />
);

export default DefaultImage;
