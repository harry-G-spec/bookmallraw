import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chat, User } from '../types';
import { users } from '../data/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';
import { Circle } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  currentUserId: string;
  isLoading?: boolean;
}

const ChatListSkeleton = () => (
  <div className="divide-y divide-gray-200">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="py-4 px-4 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-200" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ChatList: React.FC<ChatListProps> = ({ chats, currentUserId, isLoading = false }) => {
  const navigate = useNavigate();

  const getOtherUser = (chat: Chat): User => {
    const otherUserId = chat.participants.find(id => id !== currentUserId);
    return users.find(user => user.id === otherUserId) || users[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'offline':
        return 'text-gray-400';
      case 'typing':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string, lastActive: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'typing':
        return 'Typing...';
      case 'offline':
        return `Last seen ${formatDistanceToNow(new Date(lastActive))}`;
      default:
        return 'Offline';
    }
  };

  if (isLoading) {
    return <ChatListSkeleton />;
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
        <p className="text-gray-500 mb-4">
          Start a conversation by browsing books and messaging a seller.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {chats.map(chat => {
        const otherUser = getOtherUser(chat);
        const lastMessageTime = new Date(chat.lastMessage.timestamp);
        
        return (
          <div 
            key={chat.id}
            onClick={() => navigate(`/chats/${otherUser.id}`)}
            className="py-4 px-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img 
                  src={otherUser.avatar} 
                  alt={otherUser.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <Circle 
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(otherUser.status)} fill-current`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {otherUser.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(lastMessageTime)}
                  </span>
                </div>
                <p 
                  className={`text-sm truncate ${
                    chat.unreadCount > 0 && chat.lastMessage.senderId !== currentUserId
                      ? 'font-medium text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {chat.lastMessage.senderId === currentUserId ? 'You: ' : ''}
                  {chat.lastMessage.content}
                </p>
                <p className="text-xs text-gray-500">
                  {getStatusText(otherUser.status, otherUser.lastActive)}
                </p>
              </div>
              {chat.unreadCount > 0 && chat.lastMessage.senderId !== currentUserId && (
                <span className="flex-shrink-0 inline-block h-5 w-5 rounded-full bg-accent-500 text-white text-xs font-medium flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;