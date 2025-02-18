'use client'; // This directive tells Next.js to treat this file as a Client Component

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  initialSearch: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearch }) => {
  const [search, setSearch] = useState(initialSearch);

  // Use useCallback to memoize the debounced function
  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      // Update the URL with the new search query
      const url = new URL(window.location.href);
      url.searchParams.set('search', value);
      url.searchParams.set('page', '1'); // Reset to the first page
      window.history.pushState({}, '', url);

      // Trigger a re-fetch of the data by reloading the page
      window.location.reload();
    }, 700), // Debounce delay of 700ms
    [] // No dependencies, so pass an empty array
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedChangeHandler(value);
  };

  useEffect(() => {
    // Cleanup the debounce on useEffect cleanup.
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <input
      type="text"
      placeholder="Search books..."
      className="mb-4 p-2 border rounded"
      value={search}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
