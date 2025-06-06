import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { messages, chats, users, currentUser } from '../data/mockData';
import { Message, Chat } from '../types';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import { MessageSquare } from 'lucide-react';

const ChatPage = () => {
  const { sellerId } = useParams<{ sellerId?: string }>();
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Get the other user for the active chat
  const otherUser = sellerId
    ? users.find(user => user.id === sellerId)
    : activeChat
    ? users.find(user => activeChat.participants.includes(user.id) && user.id !== currentUser.id)
    : null;

  useEffect(() => {
    // Simulate API call to fetch chats
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // Filter chats for current user
      const userChatList = chats.filter(chat => 
        chat.participants.includes(currentUser.id)
      );
      
      setUserChats(userChatList);
      
      // If a specific chat is requested via URL param
      if (sellerId) {
        // Find existing chat or create a new one
        const existingChat = userChatList.find(
          chat => chat.participants.includes(sellerId)
        );
        
        if (existingChat) {
          setActiveChat(existingChat);
        } else if (users.find(user => user.id === sellerId)) {
          // Create a new chat if seller exists
          const newChat: Chat = {
            id: `new-${Date.now()}`,
            participants: [currentUser.id, sellerId],
            lastMessage: {
              id: 'placeholder',
              senderId: currentUser.id,
              receiverId: sellerId,
              content: '',
              timestamp: new Date().toISOString(),
              read: true
            },
            unreadCount: 0
          };
          
          setUserChats(prev => [...prev, newChat]);
          setActiveChat(newChat);
        }
      } else if (userChatList.length > 0) {
        // Select first chat if none specified
        setActiveChat(userChatList[0]);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [sellerId]);

  useEffect(() => {
    if (activeChat) {
      setIsLoadingMessages(true);
      // Simulate API call to fetch messages
      const timer = setTimeout(() => {
        // Get messages for the active chat
        const chatMessages = messages.filter(
          message => 
            activeChat.participants.includes(message.senderId) && 
            activeChat.participants.includes(message.receiverId)
        ).sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        setActiveChatMessages(chatMessages);
        setIsLoadingMessages(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [activeChat]);

  const handleSendMessage = (content: string) => {
    if (!activeChat || !otherUser) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: otherUser.id,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add message to the list
    setActiveChatMessages(prev => [...prev, newMessage]);
    
    // Update the chat's last message
    setUserChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat.id 
          ? { ...chat, lastMessage: newMessage, unreadCount: 0 }
          : chat
      )
    );
    
    // Update active chat
    setActiveChat(prev => 
      prev ? { ...prev, lastMessage: newMessage, unreadCount: 0 } : null
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Messages</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px] border border-gray-200">
          <div className="md:grid md:grid-cols-3 h-[600px]">
            <div className="md:col-span-1 border-r border-gray-200 h-full overflow-y-auto">
              <ChatList chats={[]} currentUserId={currentUser.id} isLoading={true} />
            </div>
            <div className="hidden md:block md:col-span-2 h-full">
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px] border border-gray-200">
        {userChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No messages yet</h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start a conversation by browsing books and messaging a seller.
            </p>
          </div>
        ) : (
          <div className="md:grid md:grid-cols-3 h-[600px]">
            {/* Chat list - Hidden on mobile when a chat is active */}
            <div className={`${sellerId ? 'hidden' : 'block'} md:block md:col-span-1 border-r border-gray-200 h-full overflow-y-auto`}>
              <ChatList chats={userChats} currentUserId={currentUser.id} isLoading={isLoading} />
            </div>
            
            {/* Active chat */}
            <div className={`${!sellerId ? 'hidden' : 'block'} md:block md:col-span-2 h-full`}>
              {activeChat && otherUser ? (
                <ChatWindow 
                  messages={activeChatMessages} 
                  currentUserId={currentUser.id}
                  otherUser={otherUser}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoadingMessages}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">
                    Select a conversation or start a new one
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;