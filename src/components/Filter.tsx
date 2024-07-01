'use client';
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HorizontalFilter = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const FilterContent = () => (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[150px] justify-between">
            Category <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="p-4 space-y-2">
            <div className="flex items-center">
              <Checkbox id="animals" />
              <label htmlFor="animals" className="ml-2 text-sm">Animals</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="nature" />
              <label htmlFor="nature" className="ml-2 text-sm">Nature</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="fantasy" />
              <label htmlFor="fantasy" className="ml-2 text-sm">Fantasy</label>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[150px] justify-between">
            Difficulty <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="p-4 space-y-2">
            <div className="flex items-center">
              <Checkbox id="easy" />
              <label htmlFor="easy" className="ml-2 text-sm">Easy</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="medium" />
              <label htmlFor="medium" className="ml-2 text-sm">Medium</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="hard" />
              <label htmlFor="hard" className="ml-2 text-sm">Hard</label>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[150px] justify-between">
            Age Group <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="p-4 space-y-2">
            <div className="flex items-center">
              <Checkbox id="kids" />
              <label htmlFor="kids" className="ml-2 text-sm">Kids</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="teens" />
              <label htmlFor="teens" className="ml-2 text-sm">Teens</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="adults" />
              <label htmlFor="adults" className="ml-2 text-sm">Adults</label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button variant="outline" size="sm" className="w-full sm:w-auto">Reset</Button>
      <Button size="sm" className="w-full sm:w-auto">Apply Filters</Button>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="sm:hidden mb-4">
        <Button 
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      <div className="hidden sm:block">
        <FilterContent />
      </div>
      {mobileFilterOpen && (
        <div className="sm:hidden mt-4">
          <FilterContent />
        </div>
      )}
    </div>
  );
};

export default HorizontalFilter;