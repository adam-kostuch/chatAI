import { FC, useState } from 'react';
import { TextField } from 'src/shared/components';
import { Box, InputAdornment, Stack, Typography, Avatar } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { SCAMPI, BASTILLE, GUN_POWDER, APPROX_BLUE } from '@chattie/colors';
import { chatters } from 'src/mocks/rawChatters';

type HistoryPanelProps = {
  activePrompt: string;
  handleChangePrompt: (prompt: string) => void;
};

const HistoryPanel: FC<HistoryPanelProps> = (props) => {
  const [searchedPrompt, setSearchedPrompt] = useState('');

  return (
    <Stack gap={4} width="35%">
      <Typography
        fontSize="1.5rem"
        fontWeight="bold"
        p={2}
        sx={{ fontFamily: 'Jura' }}
      >
        Chat
      </Typography>
      <Box>
        <TextField
          placeholder="Search..."
          value={searchedPrompt}
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
          sx={{ overflowY: chatters.length > 7 ? 'auto' : 'hidden' }}
        >
          {chatters
            .filter((chatter) =>
              chatter.name.toLowerCase().includes(searchedPrompt.toLowerCase())
            )
            .map(({ ...chatterProps }, idx) => (
              <SingleChatter key={idx} {...props} {...chatterProps} />
            ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default HistoryPanel;

type SingleChatterProps = HistoryPanelProps & {
  name: string;
  profileUrl: string;
};

const SingleChatter: FC<SingleChatterProps> = ({
  activePrompt,
  handleChangePrompt,
  name,
  profileUrl,
}) => {
  const isSelectedChatter = activePrompt === name;

  return (
    <Stack
      p={2}
      gap={3}
      direction="row"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        bgcolor: isSelectedChatter ? APPROX_BLUE : BASTILLE,
        '&:hover': {
          transition: '.5s all',
          bgcolor: !isSelectedChatter && GUN_POWDER,
        },
      }}
      onClick={() => {
        handleChangePrompt(name);
      }}
    >
      <Avatar src={profileUrl} alt="" sx={{ height: 46, width: 46 }} />
      <Typography fontFamily="Jura" fontSize="1.25em" fontWeight="bold">
        {name.length >= 16 ? `${name.slice(0, 16)}...` : name}
      </Typography>
    </Stack>
  );
};
