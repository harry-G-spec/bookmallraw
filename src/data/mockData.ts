import { Book, User, Chat, Message, Feedback } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.8,
    booksCount: 28,
    joinedDate: '2023-02-15',
    status: 'online',
    lastActive: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Robert Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.5,
    booksCount: 14,
    joinedDate: '2022-11-08',
    status: 'offline',
    lastActive: '2024-03-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    rating: 4.9,
    booksCount: 32,
    joinedDate: '2023-01-20',
    status: 'typing',
    lastActive: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Michael Wilson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4.2,
    booksCount: 9,
    joinedDate: '2023-03-10',
    status: 'online',
    lastActive: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Sarah Thompson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 4.7,
    booksCount: 21,
    joinedDate: '2022-09-18',
    status: 'offline',
    lastActive: '2024-03-14T15:45:00Z',
  },
];

// Mock Books
export const books: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 15.99,
    condition: 'Very Good',
    genre: ['Classic', 'Fiction'],
    description: 'First edition reprint in excellent condition. No highlights or notes. Minimal wear on spine and corners.',
    images: [
      'https://images.pexels.com/photos/1005324/pexels-photo-1005324.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg'
    ],
    seller: users[0],
    publishYear: 1960,
    language: 'English',
    state: 'Maharashtra',
    city: 'Mumbai',
    listedDate: '2024-03-10T08:00:00Z',
    status: 'available'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.50,
    condition: 'Good',
    genre: ['Classic', 'Fiction'],
    description: 'First edition reprint with beautiful cover art. Some minor shelf wear but overall in good condition.',
    images: [
      'https://images.pexels.com/photos/1005324/pexels-photo-1005324.jpeg',
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg'
    ],
    seller: users[2],
    publishYear: 1925,
    language: 'English',
    state: 'Delhi',
    city: 'Delhi',
    listedDate: '2024-03-12T10:30:00Z',
    status: 'available'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 18.00,
    condition: 'Very Good',
    genre: ['Dystopian', 'Fiction'],
    description: 'Hardcover edition with dust jacket. Minor shelf wear on dust jacket, book itself in excellent condition.',
    images: [
      'https://images.pexels.com/photos/1005324/pexels-photo-1005324.jpeg',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg'
    ],
    seller: users[1],
    publishYear: 1949,
    language: 'English',
    state: 'Karnataka',
    city: 'Bangalore',
    listedDate: '2024-03-14T15:45:00Z',
    status: 'available'
  }
];

// Current logged-in user (for demo purposes)
export const currentUser: User = {
  id: '6',
  name: 'You',
  avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
  rating: 4.6,
  booksCount: 5,
  joinedDate: '2023-05-01',
  status: 'online',
  lastActive: new Date().toISOString(),
};

// Mock Messages
export const messages: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    receiverId: '6',
    content: "Hi there! I saw you're interested in my copy of To Kill a Mockingbird. Let me know if you have any questions!",
    timestamp: '2024-03-15T14:30:00Z',
    read: true,
  },
  {
    id: 'm2',
    senderId: '6',
    receiverId: '1',
    content: "Yes, I am! Could you tell me more about its condition? Are there any highlights or notes in the book?",
    timestamp: '2024-03-15T14:35:00Z',
    read: true,
  },
  {
    id: 'm3',
    senderId: '1',
    receiverId: '6',
    content: "The book is in very good condition. No highlights or notes. The spine is intact with minimal creasing. Pages are clean with no tears. Would you like to see more photos?",
    timestamp: '2024-03-15T14:40:00Z',
    read: true,
  },
  {
    id: 'm4',
    senderId: '6',
    receiverId: '1',
    content: "That sounds great! Yes, I'd love to see more photos, especially of the spine and any wear on the corners.",
    timestamp: '2024-03-15T14:45:00Z',
    read: true,
  },
  {
    id: 'm5',
    senderId: '1',
    receiverId: '6',
    content: "I'll send some photos this evening when I get home. Are you interested in any other classics? I have a few more I might be selling soon.",
    timestamp: '2024-03-15T14:50:00Z',
    read: false,
  },
  {
    id: 'm6',
    senderId: '3',
    receiverId: '6',
    content: "Hello! I noticed you've been looking at The Great Gatsby. It's a first edition reprint with a beautiful cover.",
    timestamp: '2024-03-15T11:20:00Z',
    read: true,
  },
  {
    id: 'm7',
    senderId: '6',
    receiverId: '3',
    content: "Hi Emily! Yes, I'm very interested. Is the price negotiable?",
    timestamp: '2024-03-15T11:25:00Z',
    read: true,
  },
  {
    id: 'm8',
    senderId: '3',
    receiverId: '6',
    content: "I could come down to $12.50. Would that work for you?",
    timestamp: '2024-03-15T11:30:00Z',
    read: true,
  },
  {
    id: 'm9',
    senderId: '2',
    receiverId: '6',
    content: "Hey! I saw you're interested in 1984. I have a hardcover copy if you'd prefer that.",
    timestamp: '2024-03-14T09:15:00Z',
    read: true,
  },
  {
    id: 'm10',
    senderId: '6',
    receiverId: '2',
    content: "Thanks for letting me know! What's the condition of the hardcover?",
    timestamp: '2024-03-14T09:20:00Z',
    read: true,
  },
  {
    id: 'm11',
    senderId: '2',
    receiverId: '6',
    content: "It's in very good condition. Only minor shelf wear on the dust jacket.",
    timestamp: '2024-03-14T09:25:00Z',
    read: true,
  }
];

// Mock Chats
export const chats: Chat[] = [
  {
    id: 'c1',
    participants: ['6', '1'],
    lastMessage: messages[4],
    unreadCount: 1,
  },
  {
    id: 'c2',
    participants: ['6', '3'],
    lastMessage: messages[7],
    unreadCount: 0,
  },
  {
    id: 'c3',
    participants: ['6', '2'],
    lastMessage: messages[10],
    unreadCount: 0,
  }
];

// Mock Feedbacks
export const feedbacks: Feedback[] = [
  {
    id: 'f1',
    userId: '1',
    user: users[0],
    title: 'Add wishlist feature',
    content: 'It would be great to have a wishlist feature where users can save books they want to buy later. This would help keep track of interesting books without having to remember them.',
    category: 'feature',
    priority: 'medium',
    status: 'open',
    upvotes: 15,
    upvotedBy: ['2', '3', '4', '5', '6'],
    createdAt: '2024-03-10T08:30:00Z',
    updatedAt: '2024-03-10T08:30:00Z',
  },
  {
    id: 'f2',
    userId: '3',
    user: users[2],
    title: 'Search filters not working properly',
    content: 'When I try to filter books by price range, sometimes the results include books outside the specified range. This happens especially with the maximum price filter.',
    category: 'bug',
    priority: 'high',
    status: 'in-progress',
    upvotes: 8,
    upvotedBy: ['1', '4', '6'],
    createdAt: '2024-03-12T14:20:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
  },
  {
    id: 'f3',
    userId: '2',
    user: users[1],
    title: 'Improve mobile chat interface',
    content: 'The chat interface on mobile could be improved. The text input sometimes gets hidden behind the keyboard, and it\'s hard to scroll through long conversations.',
    category: 'improvement',
    priority: 'medium',
    status: 'open',
    upvotes: 12,
    upvotedBy: ['1', '3', '5', '6'],
    createdAt: '2024-03-11T16:45:00Z',
    updatedAt: '2024-03-11T16:45:00Z',
  },
  {
    id: 'f4',
    userId: '4',
    user: users[3],
    title: 'Book condition descriptions',
    content: 'Could you provide more detailed descriptions for each book condition category? Sometimes it\'s unclear what qualifies as "Good" vs "Very Good".',
    category: 'improvement',
    priority: 'low',
    status: 'resolved',
    upvotes: 6,
    upvotedBy: ['2', '5'],
    createdAt: '2024-03-09T11:30:00Z',
    updatedAt: '2024-03-14T10:20:00Z',
  },
  {
    id: 'f5',
    userId: '5',
    user: users[4],
    title: 'Love the new design!',
    content: 'Just wanted to say that the recent design updates look amazing! The book cards are much more appealing now and the overall user experience has improved significantly.',
    category: 'general',
    priority: 'low',
    status: 'closed',
    upvotes: 23,
    upvotedBy: ['1', '2', '3', '4', '6'],
    createdAt: '2024-03-08T09:15:00Z',
    updatedAt: '2024-03-08T09:15:00Z',
  },
  {
    id: 'f6',
    userId: '6',
    user: currentUser,
    title: 'Notification system needed',
    content: 'It would be helpful to have email notifications when someone messages about a book listing or when there are updates to feedback I\'ve submitted.',
    category: 'feature',
    priority: 'medium',
    status: 'open',
    upvotes: 9,
    upvotedBy: ['1', '2', '4'],
    createdAt: '2024-03-13T13:20:00Z',
    updatedAt: '2024-03-13T13:20:00Z',
  }
];

// Filter options
export const genres = [
  'Fiction', 
  'Non-Fiction', 
  'Classic', 
  'Science Fiction', 
  'Fantasy', 
  'Mystery', 
  'Thriller', 
  'Romance', 
  'Historical Fiction',
  'Biography',
  'Self-Help',
  'Adventure',
  'Dystopian',
  'Philosophical'
];

export const conditions = [
  'New', 
  'Like New', 
  'Very Good', 
  'Good', 
  'Fair', 
  'Poor'
];

// Feedback categories and priorities
export const feedbackCategories = [
  { value: 'bug', label: 'Bug Report', color: 'bg-red-100 text-red-800' },
  { value: 'feature', label: 'Feature Request', color: 'bg-blue-100 text-blue-800' },
  { value: 'improvement', label: 'Improvement', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'general', label: 'General Feedback', color: 'bg-green-100 text-green-800' }
];

export const feedbackPriorities = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-100 text-orange-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

export const feedbackStatuses = [
  { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
];