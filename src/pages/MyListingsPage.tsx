import { useState, useEffect } from 'react';
import { Book } from '../types';
import { books, currentUser } from '../data/mockData';
import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoadingSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-pulse">
    <div className="relative h-48 bg-gray-200" />
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="h-9 w-9 bg-gray-200 rounded" />
          <div className="h-9 w-9 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  </div>
);

const MyListingsPage = () => {
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchBooks = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserBooks(books.filter(book => book.seller.id === currentUser.id));
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  const handleEdit = (bookId: string) => {
    navigate(`/listings/${bookId}/edit`);
  };

  const handleDelete = async (bookId: string) => {
    setIsDeleting(bookId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserBooks(books => books.filter(book => book.id !== bookId));
    setIsDeleting(null);
    setShowDeleteConfirm(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (userBooks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            My Listings
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No books listed yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start selling your books by creating your first listing
              </p>
              <button
                onClick={() => navigate('/sell')}
                className="btn btn-primary"
              >
                List a Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          My Listings
        </h1>
        <button
          onClick={() => navigate('/sell')}
          className="btn btn-primary"
        >
          List New Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userBooks.map(book => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2">
                <span className="badge bg-white text-gray-800">
                  {book.condition}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-serif font-bold text-lg mb-1 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{book.author}</p>
              <p className="font-bold text-primary-700 mb-4">
                ₹{book.price.toFixed(2)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(book.id)}
                    className="btn btn-ghost p-2"
                    title="Edit listing"
                  >
                    <Pencil className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(book.id)}
                    className="btn btn-ghost p-2"
                    title="Delete listing"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {book.city}, {book.state}
                </div>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm === book.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Delete Listing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete "{book.title}"? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn bg-red-500 text-white hover:bg-red-600"
                      disabled={isDeleting === book.id}
                    >
                      {isDeleting === book.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListingsPage;