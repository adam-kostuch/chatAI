import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { ChattieContextProvider } from './ChattieContext';
import OnePage from './components/OnePage/OnePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PickAPartner from './components/PickAPartner/PickAPartner';
import Chat from './components/Chat/Chat';
import SampleData from './SampleData';

const client = new QueryClient();

const App: FC = () => (
  <ChattieContextProvider>
    <CookiesProvider>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/sample" element={<SampleData />} />
            <Route path="*" element={<OnePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pick-a-partner" element={<PickAPartner />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </CookiesProvider>
  </ChattieContextProvider>
);

export default App;
