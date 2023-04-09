import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OnePage from './OnePage/OnePage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import ChatPartner from './ChatPartner/ChatPartner';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnePage />} />
          {/* Clients Opinions, About Us */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/choose-partner" element={<ChatPartner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
