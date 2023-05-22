import { FC } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { CHARADE } from '@chattie/colors';
import { Divider, MessagePanelWrapper } from 'src/shared/components';
import { chatters } from 'src/mocks/rawChatters';
import { Messages } from '.';

const MessagePanel: FC<{ activePrompt: string }> = (props) => (
  <Stack
    bgcolor={CHARADE}
    borderRadius={4}
    direction="column"
    width="100%"
    divider={<Divider />}
  >
    <ChatterProfile {...props} />
    <Messages />
  </Stack>
);

export default MessagePanel;

const ChatterProfile: FC<{ activePrompt: string }> = ({ activePrompt }) => (
  <MessagePanelWrapper borderLeft="16px 0 0 0" borderRight="0 16px 0 0">
    <Avatar
      alt="chatter-profile"
      src={`${chatters.find((chatter) => chatter.name === activePrompt)}`}
    />
    <Typography fontSize="1.25em" fontWeight="bold" fontFamily="Jura">
      {activePrompt}
    </Typography>
  </MessagePanelWrapper>
);
