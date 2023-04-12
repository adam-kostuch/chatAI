import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OnePage from './components/OnePage/OnePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ChatPartner from './components/ChatPartner/ChatPartner';
import ForgetPassword from './components/LoginPage/ForgetPassword';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/choose-partner" element={<ChatPartner />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
