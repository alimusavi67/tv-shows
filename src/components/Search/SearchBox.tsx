import React, { useState, useEffect, useRef } from 'react';
import useRecentQueries from '../../hooks/useRecentQueries';
import SuggestionList from './SuggestionList';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

/**
 * SearchBox component allows users to input a search query, see recent queries,
 * and trigger a search.
 *
 * @param {SearchBoxProps} props - Props for the SearchBox component.
 * @returns {React.FC<SearchBoxProps>} A functional component.
 */
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  const { recentQueries, saveQuery } = useRecentQueries();

  /**
   * Handles input change events to update the query state and toggle suggestions.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(newQuery.trim().length === 0);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  /**
   * Handles click events on suggestions to update the query and trigger a search.
   *
   * @param {string} suggestion - The selected suggestion.
   */
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    saveQuery(suggestion);
  };

  const handleSearchClick = () => {
    onSearch(query);
    saveQuery(query);
    setShowSuggestions(false);
  };

  /**
   * Handles click events outside the input and suggestion box to hide suggestions.
   *
   * @param {MouseEvent} event - The mouse click event.
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-4 w-full md:w-1/2">
      <div className="flex">
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search shows"
          className="p-2 border text-black rounded"
        />
        <button
          onClick={handleSearchClick}
          className="p-2 border bg-blue-500 text-white ml-2 rounded flex justify-between items-center"
        >
          <FaSearch className="mr-1" /> Search
        </button>
      </div>
      {showSuggestions && recentQueries.length > 0 && (
        <SuggestionList
          suggestions={recentQueries.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))}
          onSuggestionClick={handleSuggestionClick}
          suggestionBoxRef={suggestionBoxRef}
        />
      )}
    </div>
  );
};

export default SearchBox;
