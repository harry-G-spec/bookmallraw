import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { books } from '../data/mockData';
import BookDetails from '../components/BookDetails';
import { ArrowLeft } from 'lucide-react';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Simulate API call to fetch book details
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const foundBook = books.find(book => book.id === id);
      
      if (foundBook) {
        setBook(foundBook);
        
        // Find similar books (same genre or author)
        const similar = books
          .filter(b => 
            b.id !== id && (
              b.author === foundBook.author || 
              b.genre.some(g => foundBook.genre.includes(g))
            )
          )
          .slice(0, 4);
          
        setSimilarBooks(similar);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="bg-gray-300 h-96"></div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={handleGoBack}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back to results</span>
      </button>
      
      <BookDetails book={book} />
      
      {similarBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarBooks.map(similarBook => (
              <div 
                key={similarBook.id}
                className="book-card"
                onClick={() => navigate(`/books/${similarBook.id}`)}
              >
                <div className="relative h-52 overflow-hidden rounded-t-md">
                  <img
                    src={similarBook.coverImage}
                    alt={`Cover of ${similarBook.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-lg mb-1 line-clamp-1">
                    {similarBook.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{similarBook.author}</p>
                  <p className="font-bold text-primary-700">${similarBook.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;