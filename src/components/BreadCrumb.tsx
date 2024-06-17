import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  showName?: string;
  showId?: number;
  seasonId?: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ showName, showId, seasonId }) => {
  return (
    <nav aria-label="breadcrumb" className="p-2 md:p-4 bg-gray-500 rounded">
      <ol className="flex space-x-2">
        <li className="breadcrumb-item">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          {(showName || showId) && <span className="mx-2 text-gray-400">/</span>}
        </li>
        {showId && showName && seasonId && (
          <>
            <li className="breadcrumb-item">
              <Link to={`/shows/${showId}`} className="text-white hover:underline">
                {showName}
              </Link>
              <span className="mx-2 text-gray-400">{`/ Season ${seasonId} Episodes`}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
