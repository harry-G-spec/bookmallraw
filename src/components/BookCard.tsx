import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };
  
  return (
    <div 
      className="book-card group h-full flex flex-col" 
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden rounded-t-md">
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        <img 
          src={book.images[0]} 
          alt={`Cover of ${book.title}`} 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={(e) => (e.target as HTMLElement).parentElement?.querySelector('.bg-gray-200')?.classList.add('hidden')}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 book-cover-shadow"></div>
        <div className="absolute top-2 right-2">
          <span className="badge bg-white text-gray-800 shadow-sm">
            {book.condition}
          </span>
        </div>
        {/* Image count indicator */}
        {book.images.length > 1 && (
          <div className="absolute top-2 left-2">
            <span className="badge bg-black bg-opacity-50 text-white text-xs">
              {book.images.length} photos
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-serif font-bold text-lg leading-tight mb-1 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <div className="mt-auto flex flex-wrap gap-1">
          {book && book.genre && book.genre.slice(0, 2).map((genre, index) => (
            <span 
              key={index} 
              className="badge bg-secondary-100 text-secondary-800 text-xs"
            >
              {genre}
            </span>
          ))}
          {book.genre.length > 2 && (
            <span className="badge bg-gray-100 text-gray-800 text-xs">+{book.genre.length - 2}</span>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold text-primary-700">${book.price.toFixed(2)}</span>
          <div className="flex items-center text-sm text-gray-500">
            <img 
              src={book.seller.avatar} 
              alt={book.seller.name}
              className="h-5 w-5 rounded-full object-cover mr-1" 
            />
            <span>{book.seller.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;