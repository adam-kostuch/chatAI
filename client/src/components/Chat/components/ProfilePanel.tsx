import { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Settings, Logout, ArrowBack } from '@mui/icons-material';
import { APPROX_BLUE, SCAMPI, CHARADE } from '@chattie/colors';
import { Divider, Flex } from 'src/shared/components';
import { handleSignOut } from 'src/components/CustomButton';
import { useChattieContext } from 'src/ChattieContext';
import { useCookies } from 'react-cookie';

const ProfilePanel: FC = () => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();

  return (
    <Stack
      height="100vh"
      width="25%"
      sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
      bgcolor={CHARADE}
      divider={<Divider />}
    >
      <Flex justifyContent="center" alignItems="center">
        <Typography
          color={SCAMPI}
          fontSize="1.75rem"
          p={2}
          sx={{ fontFamily: 'Jura' }}
        >
          Chattie
        </Typography>
      </Flex>
      <ProfileDetails />
      <Stack p={4}>
        <ActionButton href="/pick-a-partner">
          <ArrowBack /> Choose Partner
        </ActionButton>
        <ActionButton onClick={() => handleSignOut({ auth, removeCookie })}>
          <Logout /> Log Out
        </ActionButton>
      </Stack>
    </Stack>
  );
};

export default ProfilePanel;

const ProfileDetails: FC = () => (
  <Stack gap={6}>
    <Flex justifyContent="center" alignItems="center" p={10}>
      <Stack gap={2}>
        <Flex justifyContent="center">
          <Avatar
            src=""
            alt="profile-picture"
            sx={{
              height: 100,
              width: 100,
              boxShadow: `0 0 20px ${APPROX_BLUE}`,
            }}
          />
        </Flex>
        <Typography fontWeight="bold" variant="h5" sx={{ fontFamily: 'Jura' }}>
          Name Surname
        </Typography>
      </Stack>
    </Flex>
    <Stack p={4}>
      <Tooltip
        placement="top"
        arrow
        title="Settings are not yet available. We're working on that."
      >
        <Box textAlign="center">
          <ActionButton disabled>
            <Settings /> Settings
          </ActionButton>
        </Box>
      </Tooltip>
    </Stack>
  </Stack>
);

const ActionButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    {...props}
    sx={{
      color: SCAMPI,
      gap: 0.5,
      textTransform: 'capitalize',
      fontSize: '1rem',
    }}
  >
    {children}
  </Button>
);
