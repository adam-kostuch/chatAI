import { FC, ReactNode } from 'react';
import { Flex } from 'src/shared/components';
import { APPROX_BLUE, GUN_POWDER, VANILLA_WHITE } from '@chattie/colors';

const usersMessage = {
  bgcolor: APPROX_BLUE,
  ml: '40%',
};

const chatterMessage = {
  bgcolor: GUN_POWDER,
};

const SingleMessage: FC<{ isUsersMessage: boolean; children: ReactNode }> = ({
  isUsersMessage,
  children,
}) => {
  const messageStyle = isUsersMessage ? usersMessage : chatterMessage;

  return (
    <Flex
      minHeight={4}
      maxWidth="60%"
      mt={2}
      p={2}
      fontFamily="Jura"
      fontWeight="bold"
      sx={{ borderRadius: 2, color: VANILLA_WHITE, ...messageStyle }}
    >
      {children}
    </Flex>
  );
};

export default SingleMessage;
