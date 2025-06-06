import { useState, useEffect } from 'react';
import { Filter } from '../types';
import { genres, conditions } from '../data/mockData';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filter,
  setFilter,
  isMobileFilterOpen,
  setIsMobileFilterOpen
}) => {
  const [showGenres, setShowGenres] = useState(true);
  const [showConditions, setShowConditions] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [minPrice, setMinPrice] = useState(filter.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice?.toString() || '');

  // Apply price filter when user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter({
        ...filter,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  const handleGenreChange = (genre: string) => {
    const newGenres = filter.genre.includes(genre)
      ? filter.genre.filter(g => g !== genre)
      : [...filter.genre, genre];
    
    setFilter({ ...filter, genre: newGenres });
  };

  const handleConditionChange = (condition: string) => {
    const newConditions = filter.condition.includes(condition)
      ? filter.condition.filter(c => c !== condition)
      : [...filter.condition, condition];
    
    setFilter({ ...filter, condition: newConditions });
  };

  const clearAllFilters = () => {
    setFilter({
      ...filter,
      minPrice: null,
      maxPrice: null,
      condition: [],
      genre: []
    });
    setMinPrice('');
    setMaxPrice('');
  };

  const FilterSection = ({ title, isOpen, toggleOpen, children }: any) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={toggleOpen}
        className="flex w-full items-center justify-between text-left font-medium text-gray-900"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  );

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button
          type="button"
          className="text-sm text-primary-600 hover:text-primary-700"
          onClick={clearAllFilters}
        >
          Clear all
        </button>
        <button
          type="button"
          className="md:hidden rounded-md text-gray-500 hover:text-gray-600"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <FilterSection
          title="Price"
          isOpen={showPrice}
          toggleOpen={() => setShowPrice(!showPrice)}
        >
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="min-price" className="block text-sm text-gray-600">Min</label>
              <div className="relative mt-1 rounded-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="min-price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                  className="input pl-8"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm text-gray-600">Max</label>
              <div className="relative mt-1 rounded-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="max-price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  className="input pl-8"
                  placeholder="Any"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Book Condition"
          isOpen={showConditions}
          toggleOpen={() => setShowConditions(!showConditions)}
        >
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center">
                <input
                  id={`condition-${condition}`}
                  name="condition"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filter.condition.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
                <label
                  htmlFor={`condition-${condition}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Genre"
          isOpen={showGenres}
          toggleOpen={() => setShowGenres(!showGenres)}
        >
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center">
                <input
                  id={`genre-${genre}`}
                  name="genre"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filter.genre.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <label
                  htmlFor={`genre-${genre}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile filter dialog */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          isMobileFilterOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          onClick={() => setIsMobileFilterOpen(false)}
        ></div>
        <div
          className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition-transform duration-300 ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="px-4">{sidebarContent}</div>
        </div>
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden md:block">
        {sidebarContent}
      </div>
      
      {/* Mobile filter toggle */}
      <div className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          className="flex items-center px-4 py-2 rounded-full bg-primary-500 text-white shadow-lg"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>
    </>
  );
};

export default FilterSidebar;