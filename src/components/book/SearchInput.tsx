'use client'; // This directive tells Next.js to treat this file as a Client Component

import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  initialSearch: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearch }) => {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const debouncedChangeHandler = debounce((value: string) => {
      // Update the URL with the new search query
      const url = new URL(window.location.href);
      url.searchParams.set('search', value);
      url.searchParams.set('page', '1'); // Reset to the first page
      window.history.pushState({}, '', url);

      // Trigger a re-fetch of the data by reloading the page
      window.location.reload();
    }, 300); // Debounce delay of 300ms

    debouncedChangeHandler(search);

    // Cleanup the debounce on useEffect cleanup.
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
