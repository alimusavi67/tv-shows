import { useEffect, useState } from 'react';

function useImageLoader(src: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);

    return () => {
      img.onload = null;
    };
  }, [src]);

  return isLoading;
}

export default useImageLoader;
