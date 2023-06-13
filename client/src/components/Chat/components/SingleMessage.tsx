import { FC, ReactNode, useState, useRef, useLayoutEffect } from 'react';
import { APPROX_BLUE, GUN_POWDER, VANILLA_WHITE } from '@chattie/colors';
import { Box, Stack } from '@mui/material';
import { Typography } from 'src/shared/components';

const usersMessage = {
  bgcolor: APPROX_BLUE,
  ml: '40%',
};

const chatterMessage = {
  bgcolor: GUN_POWDER,
};

type SingleMessageProps = {
  isUsersMessage: boolean;
  timestamp: number;
  children: ReactNode;
};

const SingleMessage: FC<SingleMessageProps> = ({
  timestamp,
  isUsersMessage,
  children,
}) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const date = new Date(timestamp);
  const formattedDate = `${date.toLocaleDateString(
    'en-GB'
  )} ${date.toLocaleTimeString('en-US', { hour12: false })}`;
  const messageStyle = isUsersMessage ? usersMessage : chatterMessage;

  // useLayoutEffect do not affect props changes only DOM elements
  useLayoutEffect(() => {
    const contentElement = contentRef.current;

    if (contentElement) {
      setIsContentOverflowing(
        contentElement.scrollHeight > contentElement.clientHeight
      );
    }
  }, []);

  return (
    <Stack
      mt={2}
      width="100%"
      justifyContent="space-between"
      className="single-message-container"
    >
      <Stack alignItems="center">
        <Typography fontSize=".75rem">{formattedDate}</Typography>
      </Stack>
      <Box
        maxWidth="60%"
        p={2}
        fontFamily="Jura"
        fontWeight="bold"
        alignItems="center"
        sx={{ borderRadius: 2, color: VANILLA_WHITE, ...messageStyle }}
      >
        <Box
          ref={contentRef}
          style={{ maxHeight: isContentOverflowing ? '100%' : 'auto' }}
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
};

export default SingleMessage;
