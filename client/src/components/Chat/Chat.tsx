import { FC } from 'react';
import { Stack } from '@mui/material';
import { useCheckAuthentication, useStateWithLocalStorage } from 'src/hooks';
import { ProfilePanel, MessagePanel, HistoryPanel } from './components';
import { VANILLA_WHITE, WOODSMOKE } from '@chattie/colors';
import { chatters } from 'src/mocks/rawChatters';

const Chat: FC = () => {
  useCheckAuthentication();

  const [activePrompt, setActivePrompt] = useStateWithLocalStorage(
    'latestChatter',
    chatters[0].name
  );

  const handleChangePrompt = (prompt: string) => {
    setActivePrompt(prompt);
  };

  return (
    <Stack direction="row" bgcolor={WOODSMOKE} color={VANILLA_WHITE}>
      <ProfilePanel />
      <Stack direction="row" width="100%" gap={4} p={5}>
        <HistoryPanel
          activePrompt={activePrompt}
          handleChangePrompt={handleChangePrompt}
        />
        <MessagePanel activePrompt={activePrompt} />
      </Stack>
    </Stack>
  );
};

export default Chat;
