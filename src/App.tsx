import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import ChatPage from './pages/ChatPage';
import SellBookPage from './pages/SellBookPage';
import LoginPage from './pages/LoginPage';
import MyListingsPage from './pages/MyListingsPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/chats/:sellerId" element={<ChatPage />} />
        <Route path="/sell" element={<SellBookPage />} />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Route>
    </Routes>
  );
}

export default App;