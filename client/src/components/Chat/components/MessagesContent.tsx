import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { APPROX_BLUE } from '@chattie/colors';
import { Divider, MessagePanelWrapper, TextField } from 'src/shared/components';
import { RealtimeMessage } from 'src/types';
import { SingleMessage } from '.';

type DisplayMessagesProps = {
  messages: RealtimeMessage[];
};

type InputMessageProps = {
  newMessage: string;
  handleNewMessage: (message: string) => void;
  handleSentMessage: () => void;
};

type MessagesContentProps = DisplayMessagesProps & InputMessageProps;

const MessagesContent: FC<MessagesContentProps> = ({
  messages,
  ...inputProps
}) => (
  <Stack direction="column" divider={<Divider />}>
    <DisplayMessages messages={messages} />
    <InputMessage {...inputProps} />
  </Stack>
);

export default MessagesContent;

const DisplayMessages: FC<DisplayMessagesProps> = ({ messages }) => (
  <MessagePanelWrapper>
    <Stack
      height="72vh"
      width="100%"
      pr={1}
      direction="column-reverse"
      sx={{ overflowY: 'auto' }}
    >
      {messages.map(({ message, date, isUsersMessage }, idx) => (
        <SingleMessage
          key={idx}
          timestamp={date}
          isUsersMessage={isUsersMessage}
        >
          {message}
        </SingleMessage>
      ))}
    </Stack>
  </MessagePanelWrapper>
);

const InputMessage: FC<InputMessageProps> = ({
  newMessage,
  handleNewMessage,
  handleSentMessage,
}) => {
  const isButtonDisabled = newMessage.length === 0;

  return (
    <MessagePanelWrapper borderLeft="0 0 0 16px" borderRight="0 0 16px 0">
      <TextField
        autoComplete="off"
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
