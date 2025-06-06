import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { genres, conditions, currentUser } from '../data/mockData';
import { states, citiesByState } from '../data/indianLocations';
import { ArrowLeft, Upload, X } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
    {/* Back button skeleton */}
    <div className="flex items-center mb-6">
      <div className="h-5 w-5 bg-gray-200 rounded mr-1"></div>
      <div className="h-5 w-12 bg-gray-200 rounded"></div>
    </div>
    
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-gray-100 px-6 py-4 border-b">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>
      
      <div className="p-6">
        {/* Progress indicator skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-1 w-12 bg-gray-200 mx-2"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-1 w-12 bg-gray-200 mx-2"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Form skeleton */}
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          
          {/* Input fields skeleton */}
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-10 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex justify-end">
            <div className="h-10 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SellBookPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Book form state
  const [bookData, setBookData] = useState<Partial<Book>>({
    title: '',
    author: '',
    price: 0,
    condition: 'Good',
    genre: [],
    description: '',
    publishYear: new Date().getFullYear(),
    language: 'English',
    state: '',
    city: '',
  });

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookData(prev => {
      // Reset city if state changes
      if (name === 'state') {
        return { ...prev, [name]: value, city: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setBookData(prev => ({
      ...prev,
      genre: checked 
        ? [...(prev.genre || []), value]
        : (prev.genre || []).filter(g => g !== value)
    }));
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };
  
  const goBack = () => {
    navigate(-1);
  };

  // Get available cities based on selected state
  const availableCities = bookData.state ? citiesByState[bookData.state] || [] : [];

  // Show skeleton loader during initial loading
  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <h1 className="text-2xl font-serif font-bold text-primary-800">Sell Your Book</h1>
          <p className="text-sm text-gray-600">List your book for sale and connect with potential buyers</p>
        </div>
        
        <div className="p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`h-1 w-12 transition-colors duration-300 ${
                  step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
                }`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`h-1 w-12 transition-colors duration-300 ${
                  step >= 3 ? 'bg-primary-500' : 'bg-gray-200'
                }`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Step {step} of 3
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Book Information</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={bookData.title}
                    onChange={handleInputChange}
                    className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter the full title of the book"
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author*
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={bookData.author}
                    onChange={handleInputChange}
                    className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter the author's name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Year*
                    </label>
                    <input
                      type="number"
                      id="publishYear"
                      name="publishYear"
                      required
                      min="1000"
                      max={new Date().getFullYear()}
                      value={bookData.publishYear}
                      onChange={handleNumberInput}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language*
                    </label>
                    <select
                      id="language"
                      name="language"
                      required
                      value={bookData.language}
                      onChange={handleInputChange}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={bookData.state}
                      onChange={handleInputChange}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      value={bookData.city}
                      onChange={handleInputChange}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                      disabled={!bookData.state}
                    >
                      <option value="">Select City</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                      ISBN (optional)
                    </label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={bookData.isbn || ''}
                      onChange={handleInputChange}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter ISBN number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Page Count (optional)
                    </label>
                    <input
                      type="number"
                      id="pageCount"
                      name="pageCount"
                      min="1"
                      value={bookData.pageCount || ''}
                      onChange={handleNumberInput}
                      className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                      placeholder="Number of pages"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="btn btn-primary transition-all duration-200 hover:shadow-lg"
                    onClick={nextStep}
                    disabled={!bookData.state || !bookData.city}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Listing Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Listing Details</h2>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)*
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0.01"
                      step="0.01"
                      value={bookData.price}
                      onChange={handleNumberInput}
                      className="input pl-7 transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition*
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    value={bookData.condition}
                    onChange={handleInputChange}
                    className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genres (select at least one)*
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-y-2 gap-x-4 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center">
                        <input
                          id={`genre-${genre}`}
                          name="genre"
                          type="checkbox"
                          value={genre}
                          checked={(bookData.genre || []).includes(genre)}
                          onChange={handleGenreChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                        />
                        <label
                          htmlFor={`genre-${genre}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer"
                        >
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                  {bookData.genre?.length === 0 && (
                    <p className="mt-1 text-sm text-red-500">Please select at least one genre</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={bookData.description}
                    onChange={handleInputChange}
                    className="input transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe the book's content and condition"
                  />
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    className="btn btn-ghost transition-all duration-200"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary transition-all duration-200 hover:shadow-lg"
                    onClick={nextStep}
                    disabled={(bookData.genre || []).length === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Upload Photo & Review */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Upload Photo & Review</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Cover Photo*
                  </label>
                  {!previewImage ? (
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 transition-colors duration-200 hover:border-primary-400">
                      <div className="flex justify-center">
                        <label
                          htmlFor="cover-upload"
                          className="cursor-pointer text-center"
                        >
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <span>Upload a file</span>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                          <input
                            id="cover-upload"
                            name="coverImage"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 relative">
                      <div className="relative rounded-md overflow-hidden h-48">
                        <img
                          src={previewImage}
                          alt="Book cover preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {!previewImage && (
                    <p className="mt-1 text-sm text-red-500">Please upload a cover photo</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-3">Review Your Listing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="font-medium">{bookData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="font-medium">{bookData.author}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">₹{bookData.price?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="font-medium">{bookData.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{bookData.city}, {bookData.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Genre</p>
                      <p className="font-medium">{bookData.genre?.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-medium">{bookData.publishYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-medium">{bookData.language}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-sm">{bookData.description}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is a demo application. In a real application, you would be able to complete 
                    this transaction and list your book for sale.
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    className="btn btn-ghost transition-all duration-200"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary transition-all duration-200 hover:shadow-lg"
                    disabled={!previewImage || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'List Book for Sale'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellBookPage;