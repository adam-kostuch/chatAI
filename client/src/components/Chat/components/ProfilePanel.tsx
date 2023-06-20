import { FC, useEffect, useState } from 'react';
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
import { useModal, useUpdateProfilePicture } from 'src/hooks';
import ImageModal, {
  ImageModalProps,
} from 'src/components/ImageModal/ImageModal';
import { getUserImage } from 'src/helpers';

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
  const { onOpen: onImageModalOpen, modalProps: imageModalProps } =
    useModal<Omit<ImageModalProps, 'isOpen' | 'onClose'>>();
  const {
    db,
    activeUser: { displayName, email, profileUrl },
  } = useChattieContext();

  const [imageNumber, setImageNumber] = useState(profileUrl);

  const handleUpdate = async () => {
    await useUpdateProfilePicture(db, email, imageNumber);
  };

  const handleImageChange = (idx: string) => {
    setImageNumber(idx);
  };

  useEffect(() => {
    handleUpdate();
  }, [imageNumber]);

  return (
    <>
      <Stack gap={6} className="profile-panel-details-container">
        <Flex justifyContent="center" alignItems="center" p={10}>
          <Stack gap={2}>
            <Flex justifyContent="center">
              <Avatar
                src={getUserImage(imageNumber)}
                alt="profile-picture"
                sx={{
                  height: 100,
                  width: 100,
                  boxShadow: `0 0 20px ${APPROX_BLUE}`,
                  '&:hover': {
                    cursor: 'pointer',
                    opacity: '0.6',
                  },
                }}
                onClick={() =>
                  onImageModalOpen({ handleImageChange, imageNumber })
                }
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
      <ImageModal
        {...imageModalProps}
        handleImageChange={handleImageChange}
        imageNumber={imageNumber}
      />
    </>
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
      fontFamily: 'Jura',
    }}
  >
    {children}
  </Button>
);
