import { FC, useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import {
  useCheckAuthentication,
  useStateWithLocalStorage,
  useQueryChatters,
} from 'src/hooks';
import { ProfilePanel, Messages, HistoryPanel } from './components';
import { VANILLA_WHITE, WOODSMOKE } from '@chattie/colors';
import { LATEST_CHATTER, CHAT_PARTNER, Chatter } from 'src/types';
import { useChattieContext } from 'src/ChattieContext';
import { emptyChatter } from 'src/utils';

const getHash = (): CHAT_PARTNER => {
  const hash = window.location.hash.slice(1);

  switch (hash) {
    case 'realtime':
      return CHAT_PARTNER.REALTIME;
    case 'robot':
    default:
      return CHAT_PARTNER.ROBOT;
  }
};

const Chat: FC = () => {
  useCheckAuthentication();

  const { activeUser, db } = useChattieContext();
  const [chatters, setChatters] = useState<Chatter[]>([]);
  const [activeChatter, setActiveChatter] = useStateWithLocalStorage<Chatter>(
    LATEST_CHATTER,
    emptyChatter
  );

  // checking the site url to determine who is the chatter
  const hash = getHash();
  const isRobotChat = hash === CHAT_PARTNER.ROBOT;

  // function called on single chatter clicked in history panel
  const handleActiveChatter = (searchedChatter: string) => {
    setActiveChatter(
      chatters.find(
        (chatter) => chatter.displayName === searchedChatter
      ) as Chatter
    );
  };

  // function called after finding find chatter through modal
  const handleNewChatters = (newChatter: Chatter) => {
    const isActiveUser = activeUser.email === newChatter.email;

    if (!isActiveUser) {
      setActiveChatter(newChatter);
      setChatters((prevChatters) => {
        const isUserAlreadyPresent = prevChatters.some(
          (chatter) => chatter.email === newChatter.email
        );

        if (!isUserAlreadyPresent) {
          return [...prevChatters, newChatter];
        } else {
          return prevChatters;
        }
      });
    } else {
      setActiveChatter(emptyChatter);
    }
  };

  // this useEffect triggers on load of the site,
  // so we can find and show to the user the chatters
  useEffect(() => {
    const queryChatters = async () => {
      const queriedChatters = await useQueryChatters(
        db,
        activeUser.email,
        activeChatter.email
      );

      setChatters(queriedChatters);
    };

    queryChatters();
  }, [activeChatter]);

  return (
    <Stack
      direction="row"
      bgcolor={WOODSMOKE}
      color={VANILLA_WHITE}
      className={`${hash}-chat-container`}
    >
      <ProfilePanel />
      <Stack direction="row" width="100%" gap={4} p={5}>
        {!isRobotChat && (
          <HistoryPanel
            chatters={chatters}
            activeChatter={activeChatter}
            handleActiveChatter={handleActiveChatter}
            handleNewChatters={handleNewChatters}
          />
        )}
        <Messages
          isRobotChat={isRobotChat}
          activeChatter={activeChatter}
          setActiveChatter={setActiveChatter}
        />
      </Stack>
    </Stack>
  );
};

export default Chat;
