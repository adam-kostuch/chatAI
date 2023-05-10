import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChattieContextProvider } from './ChattieContext';
import OnePage from './components/OnePage/OnePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import RealtimeChat from './components/RealtimeChat/RealtimeChat';
import PickAPartner from './components/PickAPartner/PickAPartner';
import SampleData from './SampleData';
import RobotChat from './components/RobotChat/RobotChat';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <ChattieContextProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/sample" element={<SampleData />} />
              <Route path="*" element={<OnePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/pick-a-partner" element={<PickAPartner />} />
              <Route path="/realtime-chat" element={<RealtimeChat />} />
              <Route path="/robot-chat" element={<RobotChat />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </CookiesProvider>
    </ChattieContextProvider>
  );
};

export default App;
