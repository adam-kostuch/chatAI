import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChattieContextProvider } from './ChattieContext';

import OnePage from './components/OnePage/OnePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ChatPartner from './components/ChatPartner/ChatPartner';
import ForgetPassword from './components/LoginPage/ForgetPassword';
import RealtimeChat from './components/RealtimeChat/RealtimeChat';
import SampleData from './SampleData';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ChattieContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<OnePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/choose-partner" element={<ChatPartner />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/realtime-chat" element={<RealtimeChat />} />
            <Route path="/sample" element={<SampleData />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChattieContextProvider>
  );
};

export default App;
