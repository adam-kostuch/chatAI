import { FC, useEffect, useState } from 'react';
import { useChattieContext } from 'src/ChattieContext';
import { AllMessages, RealtimeMessage } from 'src/types';
import { MessagesContent } from '.';
import {
  useQueryUsersMessages,
  useAddNewUsersMessage,
  useUpdateMessagesState,
} from 'src/hooks';

const RealtimeMessages: FC<AllMessages> = ({
  activeChatter,
  setActiveChatter,
}) => {
  const { activeUser, db } = useChattieContext();
  const [displayNewMessage, setDisplayNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const queryMessages = async () => {
    const [queriedMessages, queriedChatsIds] = await useQueryUsersMessages(
      db,
      activeUser.email,
      activeChatter.email
    );

    setMessages(queriedMessages);
    useUpdateMessagesState(db, queriedChatsIds);
  };

  const updateMessages = async () => {
    const [, queriedChatsIds] = await useQueryUsersMessages(
      db,
      activeUser.email,
      activeChatter.email
    );

    useUpdateMessagesState(db, queriedChatsIds);
    setActiveChatter({ ...activeChatter, hasUnreadMessages: false });
  };

  const handleSentMessage = () => {
    if (
      newMessage.length !== 0 &&
      (activeChatter.email || activeChatter.displayName)
    ) {
      setDisplayNewMessage(true);
      updateMessages();
    }
  };

  // this useEffect is triggered once the user sends a message, it pushes
  // the new message to the array containing the history of messages
  useEffect(() => {
    if (displayNewMessage) {
      const queriedMessages = useAddNewUsersMessage(
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
  }, [activeChatter, activeUser]);

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
