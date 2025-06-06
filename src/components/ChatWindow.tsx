import { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types';
import { formatTime } from '../utils/dateUtils';
import { ArrowLeft, Send, Circle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  otherUser: User;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

const MessageSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, groupIndex) => (
      <div key={groupIndex}>
        <div className="flex justify-center mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, messageIndex) => {
            const isRight = (messageIndex + groupIndex) % 2 === 0;
            return (
              <div
                key={messageIndex}
                className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    isRight ? 'bg-gray-200' : 'bg-gray-100'
                  } animate-pulse`}
                >
                  <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-300 rounded" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  otherUser,
  onSendMessage,
  isLoading = false
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const goBack = () => {
    navigate('/chats');
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
        return `Last seen ${new Date(lastActive).toLocaleString()}`;
      default:
        return 'Offline';
    }
  };

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow-sm">
        <button 
          onClick={goBack}
          className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <div className="relative">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <Circle 
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(otherUser.status)} fill-current`}
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
            <div className="flex items-center ml-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{otherUser.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className={`${getStatusColor(otherUser.status)}`}>
              {getStatusText(otherUser.status, otherUser.lastActive)}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500">{otherUser.booksCount} books</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {isLoading ? (
          <MessageSkeleton />
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {date}
                </span>
              </div>
              <div className="space-y-3">
                {dateMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.senderId === currentUserId
                          ? 'chat-bubble-sender'
                          : 'chat-bubble-receiver'
                      }`}
                    >
                      <p className="text-gray-800">{message.content}</p>
                      <p className="text-right text-xs text-gray-500 mt-1">
                        {formatTime(new Date(message.timestamp))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input flex-1 mr-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-primary-500 text-white disabled:opacity-50 hover:bg-primary-600 transition-colors"
            disabled={!newMessage.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;