import { FC, useEffect, useState } from 'react';
import { useChattieContext } from 'src/ChattieContext';
import { AllMessages, Message } from 'src/types';
import { MessagesContent } from '.';
import {
  useAddNewMessage,
  useQueryMessages,
  useUpdateMessagesState,
} from 'src/hooks';

const RealtimeMessages: FC<AllMessages> = ({
  activeChatter,
  setActiveChatter,
}) => {
  const { activeUser, db } = useChattieContext();
  const [displayNewMessage, setDisplayNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const queryMessages = async () => {
    const [queriedMessages, queriedChatsIds] = await useQueryMessages(
      db,
      activeUser.email,
      activeChatter.email
    );

    setMessages(queriedMessages);
    useUpdateMessagesState(db, queriedChatsIds);
  };

  const updateMessages = async () => {
    const [, queriedChatsIds] = await useQueryMessages(
      db,
      activeUser.email,
      activeChatter.email
    );

    useUpdateMessagesState(db, queriedChatsIds);
    setActiveChatter({ ...activeChatter, hasUnreadMessages: false });
  };

  const handleSentMessage = () => {
    if (newMessage.length !== 0) {
      setDisplayNewMessage(true);
      updateMessages();
    }
  };

  // this useEffect is triggered once the user sends a message, it pushes
  // the new message to the array containing the history of messages
  useEffect(() => {
    if (displayNewMessage) {
      const queriedMessages = useAddNewMessage(
        db,
        newMessage,
        messages,
        activeUser,
        activeChatter
      );

      setMessages(queriedMessages);
      setDisplayNewMessage(false);
      handleNewMessage('');
    }
  }, [displayNewMessage]);

  // this hook is being called once the user changes the chatter
  useEffect(() => {
    queryMessages();
  }, [activeChatter]);

  return (
    <MessagesContent
      messages={messages}
      newMessage={newMessage}
      handleNewMessage={handleNewMessage}
      handleSentMessage={handleSentMessage}
    />
  );
};

export default RealtimeMessages;
