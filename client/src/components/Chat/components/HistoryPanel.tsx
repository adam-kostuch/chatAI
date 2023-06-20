import { FC, useState } from 'react';
import { Flex, TextField, Typography } from 'src/shared/components';
import { Box, InputAdornment, Stack, Avatar, Button } from '@mui/material';
import { SCAMPI, BASTILLE, GUN_POWDER, APPROX_BLUE } from '@chattie/colors';
import { Circle, Close, Search } from '@mui/icons-material';
import { Chatter } from 'src/types';
import { NewConversationModal } from '.';
import { useModal } from 'src/hooks';
import { NewConversationModalProps } from './NewConversationModal';
import { getUserImage } from 'src/helpers';

type HistoryPanelProps = {
  chatters: Chatter[];
  activeChatter: Chatter;
  handleActiveChatter: (name: string) => void;
  handleNewChatters: (chatter: Chatter) => void;
};

const HistoryPanel: FC<HistoryPanelProps> = (props) => {
  const { chatters, handleNewChatters } = props;
  const [searchedPrompt, setSearchedPrompt] = useState('');
  const {
    onOpen: onNewConversationModalOpen,
    modalProps: newConversationModalProps,
  } = useModal<Omit<NewConversationModalProps, 'isOpen' | 'onClose'>>();

  return (
    <>
      <Stack gap={4} width="35%" className="history-panel-container">
        <Flex justifyContent="space-between">
          <Typography p={2} fontSize="1.5rem">
            Chat
          </Typography>
          <Button
            sx={{ py: 0, fontFamily: 'Jura' }}
            variant="outlined"
            onClick={() => onNewConversationModalOpen({ ...props })}
            className="new-message-button"
          >
            New Message
          </Button>
        </Flex>
        <Box>
          <TextField
            placeholder="Search..."
            value={searchedPrompt}
            className="search-chatter-input"
            onChange={(e) => setSearchedPrompt(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: SCAMPI }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    onClick={() => setSearchedPrompt('')}
                    sx={{
                      display: searchedPrompt === '' ? 'none' : 'auto',
                      cursor: 'pointer',
                      color: SCAMPI,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Stack
            mt={4}
            gap={3}
            maxHeight="70vh"
            pr={2}
            className="history-panel-chatters-container"
            sx={{ overflowY: chatters.length > 7 ? 'auto' : 'hidden' }}
          >
            {chatters
              .filter((chatter) =>
                chatter.displayName
                  .toLowerCase()
                  .includes(searchedPrompt.toLowerCase())
              )
              .map(({ ...chatterProps }, idx) => (
                <SingleChatter key={idx} {...props} {...chatterProps} />
              ))}
          </Stack>
        </Box>
      </Stack>
      <NewConversationModal
        {...newConversationModalProps}
        handleNewChatters={handleNewChatters}
      />
    </>
  );
};

export default HistoryPanel;

type SingleChatterProps = Omit<
  HistoryPanelProps,
  'handleNewChatters' | 'chatters'
> &
  Chatter;

const SingleChatter: FC<SingleChatterProps> = ({
  email,
  profileUrl,
  displayName,
  activeChatter,
  hasUnreadMessages,
  handleActiveChatter,
}) => {
  const trimLength = 16;
  const isSelectedChatter = activeChatter.displayName === displayName;

  if (!email || !displayName) {
    return <></>;
  }

  return (
    <Stack
      p={2}
      height="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={`single-chatter-container single-chatter-${displayName}`}
      onClick={() => {
        handleActiveChatter(displayName);
      }}
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        bgcolor: isSelectedChatter ? APPROX_BLUE : BASTILLE,
        '&:hover': {
          transition: '.5s all',
          bgcolor: !isSelectedChatter && GUN_POWDER,
        },
      }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar
          alt={email}
          src={getUserImage(profileUrl)}
          sx={{ height: 46, width: 46 }}
        />
        <Typography fontSize="1.25em">
          {displayName.length >= trimLength
            ? `${displayName.slice(0, trimLength)}...`
            : displayName}
        </Typography>
      </Stack>
      {hasUnreadMessages && <Circle fontSize="small" />}
    </Stack>
  );
};
