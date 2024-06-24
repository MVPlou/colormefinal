// src/components/SearchBar.tsx
'use client'

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden shadow-lg">
        <Input
          type="text"
          placeholder="Search for coloring templates..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow text-lg py-4 px-6 border-none focus:ring-0"
        />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full">
          <Search className="h-6 w-6 mr-2" />
          
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;