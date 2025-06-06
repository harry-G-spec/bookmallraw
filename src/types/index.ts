export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  images: string[]; // Changed from coverImage to images array
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  genre: string[];
  description: string;
  publishYear: number;
  seller: User;
  isbn?: string;
  language: string;
  pageCount?: number;
  publisher?: string;
  state: string;
  city: string;
  listedDate: string;
  status: 'available' | 'sold' | 'reserved';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  booksCount: number;
  joinedDate: string;
  status: 'online' | 'offline' | 'typing';
  lastActive: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: [string, string]; // [currentUser, otherUser]
  lastMessage: Message;
  unreadCount: number;
}

export interface Filter {
  search: string;
  minPrice: number | null;
  maxPrice: number | null;
  condition: string[];
  genre: string[];
}