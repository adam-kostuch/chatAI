import { FC } from 'react';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { BLAZE_ORANGE, APPROX_BLUE, VANILLA_WHITE } from '@chattie/colors';

const ClientsOpinions: FC = () => {
  return (
    <Container
      className="clients-opinions container"
      sx={{ color: 'white', height: '60vh', position: 'relative' }}
    >
      <Box
        className="styled card"
        sx={{
          margin: '150px auto 50px auto',
          width: '380px',
          height: '450px',
          backgroundColor: BLAZE_ORANGE,
          borderRadius: '20px',
          position: 'relative',
        }}
      >
        <Box
          className="post box"
          sx={{ position: 'absolute', zIndex: 10, padding: '30px' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Chattie" src="" />
            <Typography>Chattie</Typography>
          </Stack>
          <Box
            className="post-photo"
            sx={{
              backgroundColor: 'black',
              borderRadius: '20px',
              marginTop: '20px',
              marginBottom: '20px',
              width: '90&',
              height: '227px',
              padding: '20px',
            }}
          >
            <Typography className="text-post" sx={{ fontSize: '40px' }}>
              How Do <span style={{ color: BLAZE_ORANGE }}>YOU</span> Feel About
              <span style={{ color: BLAZE_ORANGE }}> Chattie</span>?
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={0.5}>
              <ChatBubbleOutlineOutlinedIcon />
              <Typography>687</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <FavoriteBorderOutlinedIcon />
              <Typography>17,500</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <SendOutlinedIcon />
              <Typography>431</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box
        className="circle box"
        sx={{ position: 'absolute', zIndex: 10, top: 0 }}
      >
        <Stack
          direction="row"
          className="comment-1"
          spacing={2}
          sx={{ position: 'relative', top: 0, left: -30, alignItems: 'center' }}
        >
          <span
            className="circle avatar-1"
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: VANILLA_WHITE,
              borderRadius: '50%',
            }}
          ></span>
          <Box
            className="comment-text box"
            sx={{
              backgroundColor: APPROX_BLUE,
              width: '250px',
              borderRadius: '20px',
              color: 'white',
              padding: 3,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              I love this application! It&apos;s so easy to use and has all the
              features I need to communicate.
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          className="comment-2"
          spacing={2}
          sx={{
            position: 'relative',
            top: -180,
            left: 700,
            alignItems: 'center',
          }}
        >
          <span
            className="circle avatar-1"
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: VANILLA_WHITE,
              borderRadius: '50%',
            }}
          ></span>
          <Box
            className="comment-text box"
            sx={{
              backgroundColor: APPROX_BLUE,
              width: '180px',
              height: '100px',
              borderRadius: '20px',
              color: 'white',
              padding: 3,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Definitely my go-to chat app!
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          className="comment-3"
          spacing={2}
          sx={{
            position: 'relative',
            top: -50,
            left: 750,
            alignItems: 'center',
          }}
        >
          <span
            className="circle avatar-1"
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: VANILLA_WHITE,
              borderRadius: '50%',
            }}
          ></span>
          <Box
            className="comment-text box"
            sx={{
              backgroundColor: APPROX_BLUE,
              width: '250px',
              height: '70px',
              borderRadius: '20px',
              color: 'white',
              padding: 3,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Definitely my go-to chat app!
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          className="comment-4"
          spacing={2}
          sx={{
            position: 'relative',
            top: -40,
            left: 20,
            alignItems: 'center',
          }}
        >
          <Box
            className="comment-text box"
            sx={{
              backgroundColor: APPROX_BLUE,
              width: '250px',
              height: '60px',
              borderRadius: '20px',
              color: 'white',
              padding: 3,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Definitely my go-to chat app!
            </Typography>
          </Box>
          <span
            className="circle avatar-1"
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: VANILLA_WHITE,
              borderRadius: '50%',
            }}
          ></span>
        </Stack>
        <Stack
          direction="row"
          className="comment-5"
          spacing={2}
          sx={{
            position: 'relative',
            top: -140,
            left: 650,
            alignItems: 'center',
          }}
        >
          <Box
            className="comment-text box"
            sx={{
              backgroundColor: APPROX_BLUE,
              width: '180px',
              height: '100px',
              borderRadius: '20px',
              color: 'white',
              padding: 3,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Definitely my go-to chat app!
            </Typography>
          </Box>
          <span
            className="circle avatar-1"
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: VANILLA_WHITE,
              borderRadius: '50%',
            }}
          ></span>
        </Stack>
      </Box>
    </Container>
  );
};

export default ClientsOpinions;
