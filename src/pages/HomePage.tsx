import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../data/mockData';
import { Book, Filter } from '../types';
import BookGallery from '../components/BookGallery';
import FilterSidebar from '../components/FilterSidebar';
import { SlidersHorizontal } from 'lucide-react';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    search: searchParams.get('search') || '',
    minPrice: null,
    maxPrice: null,
    condition: [],
    genre: searchParams.get('genre') ? [searchParams.get('genre') as string] : [],
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const filtered = books.filter(book => {
        // Search filter
        if (filter.search && !book.title.toLowerCase().includes(filter.search.toLowerCase()) && 
            !book.author.toLowerCase().includes(filter.search.toLowerCase())) {
          return false;
        }
        
        // Price filters
        if (filter.minPrice !== null && book.price < filter.minPrice) {
          return false;
        }
        if (filter.maxPrice !== null && book.price > filter.maxPrice) {
          return false;
        }
        
        // Condition filter
        if (filter.condition.length > 0 && !filter.condition.includes(book.condition)) {
          return false;
        }
        
        // Genre filter
        if (filter.genre.length > 0 && !book.genre.some(g => filter.genre.includes(g))) {
          return false;
        }
        
        return true;
      });
      
      setFilteredBooks(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [filter]);

  // Update URL search params when search filter changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (filter.search) {
      newSearchParams.set('search', filter.search);
    }
    if (filter.genre.length === 1) {
      newSearchParams.set('genre', filter.genre[0]);
    }
    
    // Update URL without triggering navigation
    const newUrl = 
      window.location.pathname + 
      (newSearchParams.toString() ? `?${newSearchParams.toString()}` : '');
    
    window.history.replaceState(null, '', newUrl);
  }, [filter.search, filter.genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
      <div className="md:flex md:space-x-8">
        {/* Sidebar for filters */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar 
              filter={filter}
              setFilter={setFilter}
              isMobileFilterOpen={isMobileFilterOpen}
              setIsMobileFilterOpen={setIsMobileFilterOpen}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              {filter.search ? `Results for "${filter.search}"` : 'All Books'}
            </h1>
            <p className="text-sm text-gray-500">
              {isLoading ? 'Loading...' : `${filteredBooks.length} books found`}
            </p>
          </div>

          <BookGallery 
            books={filteredBooks} 
            isLoading={isLoading}
          />

          {/* Mobile filter dialog */}
          <div className="md:hidden">
            <FilterSidebar 
              filter={filter}
              setFilter={setFilter}
              isMobileFilterOpen={isMobileFilterOpen}
              setIsMobileFilterOpen={setIsMobileFilterOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;