import { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Stack,
  Tooltip,
} from '@mui/material';
import { Settings, Logout, ArrowBack } from '@mui/icons-material';
import { APPROX_BLUE, SCAMPI, CHARADE } from '@chattie/colors';
import { Divider, Flex, Typography } from 'src/shared/components';
import { handleSignOut } from 'src/shared/components/RedirectButton';
import { useCookies } from 'react-cookie';
import { useChattieContext } from 'src/ChattieContext';

const ProfilePanel: FC = () => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();

  return (
    <Stack
      height="100vh"
      width="25%"
      bgcolor={CHARADE}
      divider={<Divider />}
      className="profile-panel-container"
      sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
    >
      <Flex justifyContent="center" alignItems="center">
        <Typography color={SCAMPI} fontSize="1.75rem" p={2}>
          Chattie
        </Typography>
      </Flex>
      <ProfileDetails />
      <Stack p={4}>
        <ActionButton href="/pick-a-partner">
          <ArrowBack /> Choose Partner
        </ActionButton>
        <ActionButton onClick={() => handleSignOut(auth, removeCookie)}>
          <Logout /> Log Out
        </ActionButton>
      </Stack>
    </Stack>
  );
};

export default ProfilePanel;

const ProfileDetails: FC = () => {
  const {
    activeUser: { displayName, email },
  } = useChattieContext();

  return (
    <Stack gap={6} className="profile-panel-details-container">
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
          <Stack textAlign="center" gap={0.5}>
            <Typography fontSize="1.5rem">{displayName}</Typography>
            <Typography fontSize="1rem">{email}</Typography>
          </Stack>
        </Stack>
      </Flex>
      <Stack p={4}>
        <Tooltip
          placement="top"
          arrow
          title="Settings are not yet available. We're working on that."
        >
          <Box textAlign="center" className="profile-panel-settings-button">
            <ActionButton disabled>
              <Settings /> Settings
            </ActionButton>
          </Box>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

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
