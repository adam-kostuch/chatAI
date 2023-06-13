import { FC } from 'react';
import { Avatar, Stack } from '@mui/material';
import { CHARADE } from '@chattie/colors';
import {
  Divider,
  MessagePanelWrapper,
  Typography,
} from 'src/shared/components';
import { Chatter } from 'src/types';
import { RealtimeMessages } from '.';
import { chattieChatter } from 'src/utils';
import RobotMessages from './RobotMessages';

type MessagePanelProps = {
  isRobotChat: boolean;
  activeChatter: Chatter;
  setActiveChatter: (chatter: Chatter) => void;
};

const Messages: FC<MessagePanelProps> = (props) => (
  <Stack
    bgcolor={CHARADE}
    borderRadius={4}
    direction="column"
    width="100%"
    className="messages-container"
    divider={<Divider />}
  >
    <ChatterSummary {...props} />
    {props.isRobotChat ? <RobotMessages /> : <RealtimeMessages {...props} />}
  </Stack>
);

export default Messages;

const ChatterSummary: FC<MessagePanelProps> = ({
  isRobotChat,
  activeChatter,
}) => {
  const { displayName, email, profileUrl }: Chatter = isRobotChat
    ? chattieChatter
    : activeChatter;

  return (
    <MessagePanelWrapper
      borderLeft="16px 0 0 0"
      borderRight="0 16px 0 0"
      className="messages-chatter-summary-container"
    >
      <Avatar
        alt="chatter-profile"
        src={profileUrl}
        sx={{ height: 56, width: 56 }}
      />
      <Stack>
        <Typography fontSize="1.25em">{displayName}</Typography>
        <Typography fontSize=".75em" fontWeight="medium">
          {email}
        </Typography>
      </Stack>
    </MessagePanelWrapper>
  );
};
