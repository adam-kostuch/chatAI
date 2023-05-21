import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { Send } from '@mui/icons-material';
import { APPROX_BLUE } from '@chattie/colors';
import { Divider, MessagePanelWrapper, TextField } from 'src/shared/components';
import { InputAdornment, Stack } from '@mui/material';
import { SingleMessage } from '.';

type MessageProps = {
  message: string;
  isUsersMessage: boolean;
};

const Messages: FC = () => {
  // We'll need probably here logic to read data
  const [displayNewMessage, setDisplayNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const handleSentMessage = () => {
    if (newMessage.length !== 0) {
      setDisplayNewMessage(true);
    }
  };

  return (
    <Stack direction="column" divider={<Divider />}>
      <DisplayMessages
        newMessage={newMessage}
        displayNewMessage={displayNewMessage}
        handleNewMessage={handleNewMessage}
        setDisplayNewMessage={setDisplayNewMessage}
      />
      <InputMessage
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        handleSentMessage={handleSentMessage}
      />
    </Stack>
  );
};

export default Messages;

type DisplayMessagesProps = {
  newMessage: string;
  displayNewMessage: boolean;
  handleNewMessage: (message: string) => void;
  setDisplayNewMessage: (display: boolean) => void;
};

const DisplayMessages: FC<DisplayMessagesProps> = ({
  newMessage,
  displayNewMessage,
  handleNewMessage,
  setDisplayNewMessage,
}) => {
  const [messages, newMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    if (displayNewMessage) {
      newMessages([{ message: newMessage, isUsersMessage: true }, ...messages]);
      setDisplayNewMessage(false);
      handleNewMessage('');
    }
  }, [displayNewMessage]);

  return (
    <MessagePanelWrapper>
      <Stack height="72vh" width="100%" direction="column-reverse">
        {messages.map(({ message, isUsersMessage }, idx) => (
          <SingleMessage key={idx} isUsersMessage={isUsersMessage}>
            {message}
          </SingleMessage>
        ))}
      </Stack>
    </MessagePanelWrapper>
  );
};

type InputMessageProps = {
  newMessage: string;
  handleNewMessage: (message: string) => void;
  handleSentMessage: () => void;
};
const InputMessage: FC<InputMessageProps> = ({
  newMessage,
  handleNewMessage,
  handleSentMessage,
}) => {
  const isButtonDisabled = newMessage.length === 0;

  return (
    <MessagePanelWrapper borderLeft="0 0 0 16px" borderRight="0 0 16px 0">
      <TextField
        value={newMessage}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.code === 'Enter') {
            handleSentMessage();
          }
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleNewMessage(event.target.value)
        }
        placeholder="Let's CHAT(TIE)..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Send
                htmlColor={APPROX_BLUE}
                onClick={() => handleSentMessage()}
                color={isButtonDisabled ? 'disabled' : 'primary'}
                sx={{ cursor: isButtonDisabled ? 'initial' : 'pointer' }}
              />
            </InputAdornment>
          ),
        }}
      />
    </MessagePanelWrapper>
  );
};
