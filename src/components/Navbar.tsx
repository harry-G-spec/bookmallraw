import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, MessageSquare, Menu, X, Library, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-serif font-bold text-primary-700">BookBazaar</span>
            </Link>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books..."
                  className="input pr-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/my-listings" 
              className="p-2 rounded-full hover:bg-gray-100"
              title="My Listings"
            >
              <Library className="h-6 w-6 text-gray-600" />
            </Link>
            <Link 
              to="/feedback" 
              className="p-2 rounded-full hover:bg-gray-100"
              title="Feedback"
            >
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </Link>
            <Link 
              to="/sell" 
              className="btn btn-primary"
            >
              Sell a Book
            </Link>
            <Link 
              to="/chats" 
              className="relative p-2 rounded-full hover:bg-gray-100"
              title="Messages"
            >
              <MessageSquare className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books..."
                  className="input pr-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            
            <Link 
              to="/sell" 
              className="btn btn-primary w-full flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell a Book
            </Link>
            
            <Link 
              to="/my-listings" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Library className="mr-3 h-6 w-6 text-gray-500" />
              My Listings
            </Link>
            
            <Link 
              to="/feedback" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="mr-3 h-6 w-6 text-gray-500" />
              Feedback
            </Link>
            
            <Link 
              to="/chats" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="mr-3 h-6 w-6 text-gray-500" />
              Messages
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;