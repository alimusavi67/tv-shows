import React from 'react';

interface SuggestionListProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  suggestionBoxRef: React.RefObject<HTMLUListElement>;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSuggestionClick, suggestionBoxRef }) => {
  return (
    <ul
      ref={suggestionBoxRef}
      className="absolute left-0 right-0 bg-white text-black border mt-1 z-50 max-h-48 overflow-auto shadow-lg"
    >
      {suggestions.map((suggestion, index) => (
        <div key={index} onClick={() => onSuggestionClick(suggestion)} className="p-2 cursor-pointer hover:bg-gray-200">
          {suggestion}
        </div>
      ))}
    </ul>
  );
};

export default SuggestionList;
