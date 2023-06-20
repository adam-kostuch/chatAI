import { FC, useEffect, useState } from 'react';
import { MessagesContent } from '.';
import { useChattieContext } from 'src/ChattieContext';
import { RobotMessage } from 'src/types';
import { useAI, useQueryRobotMessages, useAddNewRobotMessage } from 'src/hooks';

const RobotMessages: FC = () => {
  const { activeUser, db, apiClient } = useChattieContext();
  const [displayNewMessage, setDisplayNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<RobotMessage[]>([]);

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const queryMessages = async () => {
    const queriedMessages = await useQueryRobotMessages(db, activeUser.email);

    setMessages(queriedMessages);
  };

  const appendNewMessages = async () => {
    const userMessage = await useAddNewRobotMessage(db, newMessage, activeUser);
    const robotMessage = await useAI(db, apiClient, newMessage, activeUser);

    setMessages(
      [...messages, userMessage, robotMessage].sort(
        (prevChat, currentChat) => currentChat.date - prevChat.date
      )
    );
  };

  const handleSentMessage = () => {
    if (newMessage.length !== 0) {
      setDisplayNewMessage(true);
    }
  };

  useEffect(() => {
    if (displayNewMessage) {
      setDisplayNewMessage(false);
      handleNewMessage('');
      appendNewMessages();
    }
  }, [displayNewMessage]);

  useEffect(() => {
    queryMessages();
  }, []);

  return (
    <MessagesContent
      messages={messages}
      newMessage={newMessage}
      handleNewMessage={handleNewMessage}
      handleSentMessage={handleSentMessage}
    />
  );
};

export default RobotMessages;
