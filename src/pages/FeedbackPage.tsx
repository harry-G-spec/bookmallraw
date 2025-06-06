import { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { feedbacks, currentUser, feedbackCategories, feedbackPriorities } from '../data/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';
import { 
  ChevronUp, 
  MessageSquare, 
  Send, 
  Filter,
  X,
  AlertCircle,
  Lightbulb,
  Bug,
  Settings
} from 'lucide-react';

const FeedbackPage = () => {
  const [allFeedbacks, setAllFeedbacks] = useState<Feedback[]>(feedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>(feedbacks);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as Feedback['category'],
    priority: 'medium' as Feedback['priority']
  });
  
  // Filter state
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    status: 'all',
    sortBy: 'newest'
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...allFeedbacks];
    
    // Category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(feedback => feedback.category === activeFilters.category);
    }
    
    // Status filter
    if (activeFilters.status !== 'all') {
      filtered = filtered.filter(feedback => feedback.status === activeFilters.status);
    }
    
    // Sort
    switch (activeFilters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'most-upvoted':
        filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'least-upvoted':
        filtered.sort((a, b) => a.upvotes - b.upvotes);
        break;
    }
    
    setFilteredFeedbacks(filtered);
  }, [allFeedbacks, activeFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFeedback: Feedback = {
      id: `f${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      title: formData.title,
      content: formData.content,
      category: formData.category,
      priority: formData.priority,
      status: 'open',
      upvotes: 0,
      upvotedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setAllFeedbacks(prev => [newFeedback, ...prev]);
    setFormData({ title: '', content: '', category: 'general', priority: 'medium' });
    setIsSubmitting(false);
  };

  const handleUpvote = async (feedbackId: string) => {
    const feedback = allFeedbacks.find(f => f.id === feedbackId);
    if (!feedback) return;
    
    const hasUpvoted = feedback.upvotedBy.includes(currentUser.id);
    
    setAllFeedbacks(prev => prev.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          upvotes: hasUpvoted ? f.upvotes - 1 : f.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? f.upvotedBy.filter(id => id !== currentUser.id)
            : [...f.upvotedBy, currentUser.id]
        };
      }
      return f;
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug': return <Bug className="h-4 w-4" />;
      case 'feature': return <Lightbulb className="h-4 w-4" />;
      case 'improvement': return <Settings className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = feedbackCategories.find(c => c.value === category);
    return categoryObj?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Feedback & Suggestions
        </h1>
        <p className="text-gray-600">
          Help us improve BookBazaar by sharing your feedback, reporting bugs, or suggesting new features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feedback Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Submit Feedback
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Brief description of your feedback"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input"
                >
                  {feedbackCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority*
                </label>
                <select
                  id="priority"
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="input"
                >
                  {feedbackPriorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Provide detailed information about your feedback..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Feedback List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-ghost p-2 lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4`}>
              <div className="flex-1">
                <label htmlFor="category-filter" className="block text-sm text-gray-600 mb-1 lg:hidden">
                  Category
                </label>
                <select
                  id="category-filter"
                  value={activeFilters.category}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="input text-sm"
                >
                  <option value="all">All Categories</option>
                  {feedbackCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label htmlFor="status-filter" className="block text-sm text-gray-600 mb-1 lg:hidden">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={activeFilters.status}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="input text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label htmlFor="sort-filter" className="block text-sm text-gray-600 mb-1 lg:hidden">
                  Sort by
                </label>
                <select
                  id="sort-filter"
                  value={activeFilters.sortBy}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="input text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-upvoted">Most Upvoted</option>
                  <option value="least-upvoted">Least Upvoted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {isLoading ? (
              <LoadingSkeleton />
            ) : filteredFeedbacks.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
                <p className="text-gray-500">
                  No feedback matches your current filters. Try adjusting your filter criteria.
                </p>
              </div>
            ) : (
              filteredFeedbacks.map(feedback => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {feedback.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`badge ${getCategoryColor(feedback.category)} flex items-center`}>
                          {getCategoryIcon(feedback.category)}
                          <span className="ml-1">{feedbackCategories.find(c => c.value === feedback.category)?.label}</span>
                        </span>
                        <span className={`badge ${getStatusColor(feedback.status)}`}>
                          {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Upvote Button */}
                    <button
                      onClick={() => handleUpvote(feedback.id)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                        feedback.upvotedBy.includes(currentUser.id)
                          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronUp className={`h-5 w-5 ${
                        feedback.upvotedBy.includes(currentUser.id) ? 'fill-current' : ''
                      }`} />
                      <span className="text-sm font-medium">{feedback.upvotes}</span>
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feedback.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <img
                          src={feedback.user.avatar}
                          alt={feedback.user.name}
                          className="h-6 w-6 rounded-full object-cover mr-2"
                        />
                        <span>{feedback.user.name}</span>
                      </div>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(feedback.createdAt))}</span>
                    </div>
                    
                    {feedback.updatedAt !== feedback.createdAt && (
                      <span className="text-xs">
                        Updated {formatDistanceToNow(new Date(feedback.updatedAt))}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;