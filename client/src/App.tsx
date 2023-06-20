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
import Authentication from './components/Authentication/Authentication';
import { CHAT_PARTNER } from './types';

const client = new QueryClient();

const App: FC = () => (
  <ChattieContextProvider>
    <CookiesProvider>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="*" element={<OnePage />} />
            <Route
              path="/login"
              element={<Authentication form={<LoginPage />} />}
            />
            <Route
              path="/register"
              element={<Authentication form={<RegisterPage />} />}
            />
            <Route path="/pick-a-partner" element={<PickAPartner />} />
            <Route
              path="/chat/robot"
              element={<Chat partner={CHAT_PARTNER.ROBOT} />}
            />
            <Route
              path="/chat/realtime"
              element={<Chat partner={CHAT_PARTNER.REALTIME} />}
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </CookiesProvider>
  </ChattieContextProvider>
);

export default App;
