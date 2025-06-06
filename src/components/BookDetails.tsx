import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleChatClick = () => {
    navigate(`/chats/${book.seller.id}`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === book.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? book.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Book Image Slider */}
        <div className="md:w-1/3 bg-gray-200 relative">
          <div className="relative h-full min-h-[400px] md:min-h-0">
            {/* Main Image */}
            <div className="relative h-full overflow-hidden">
              <img
                src={book.images[currentImageIndex]}
                alt={`${book.title} - Image ${currentImageIndex + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              />
              
              {/* Navigation Arrows - Only show if more than 1 image */}
              {book.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {book.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {book.images.length}
                </div>
              )}
            </div>
            
            {/* Dots Indicator - Only show if more than 1 image */}
            {book.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {book.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Thumbnail Strip - Only show if more than 1 image */}
          {book.images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {book.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-white scale-110'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Book Information */}
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {book.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="badge bg-secondary-100 text-secondary-800"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center bg-primary-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-primary-700">${book.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Condition: <span className="font-semibold">{book.condition}</span></p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <h2 className="font-serif text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{book.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-serif text-lg font-semibold mb-2">Book Details</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">Publisher:</span>
                  <span className="font-medium">{book.publisher || 'Not specified'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Publication Year:</span>
                  <span className="font-medium">{book.publishYear}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Language:</span>
                  <span className="font-medium">{book.language}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Pages:</span>
                  <span className="font-medium">{book.pageCount || 'Not specified'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">ISBN:</span>
                  <span className="font-medium">{book.isbn || 'Not available'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-serif text-lg font-semibold mb-2">Seller Information</h2>
              <div className="flex items-center mb-3">
                <img
                  src={book.seller.avatar}
                  alt={book.seller.name}
                  className="h-12 w-12 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{book.seller.name}</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-yellow-500">★</span> {book.seller.rating.toFixed(1)} · {book.seller.booksCount} books
                  </p>
                  <p className="text-xs text-gray-500">Member since {new Date(book.seller.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={handleChatClick}
                className="btn btn-secondary w-full flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;