import { FC } from 'react';
import { styled, Container, Box, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { LIGHT_GRAYISH_BLUE } from '@chattie/colors';

const AboutUsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  width: '100%',
  height: '180vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AboutUsContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: 895,
  padding: '30px',
  [theme.breakpoints.down('md')]: {
    marginTop: '150px',
  },
}));

const BotDesc = ['innovative bot', 'using advanced', 'AI technology'];

const aboutUsTexts1 = [
  'Chattie is perfect for anyone looking for a seamless, intuitive messaging experience across all their devices.',
  'Our advanced AI technology allows Chattie to understand natural language, making messaging effortless.',
];

const aboutUsTexts2 = [
  'App designed to simplify and streamline your communication need',
  'Customizable settings make Chattie a personalized experience tailored to your preferences',
];

const AboutUs: FC = () => {
  return (
    <AboutUsContainer className="main" maxWidth={false} disableGutters>
      <AboutUsContent>
        {BotDesc.map((desc) => (
          <Typography className="text" key={desc} sx={{ fontSize: '64px' }}>
            {desc}
          </Typography>
        ))}
      </AboutUsContent>
      <Box
        className="box-1"
        sx={{
          marginTop: '150px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <ChatBubbleIcon
          sx={{
            color: LIGHT_GRAYISH_BLUE,
            fontSize: '80px',
            marginBottom: '7px',
          }}
        />
        <Typography
          variant="h3"
          sx={{ color: LIGHT_GRAYISH_BLUE, marginBottom: '10px' }}
        >
          Chattie is perfect
        </Typography>
        {aboutUsTexts1.map((text) => (
          <Typography
            variant="subtitle1"
            key="texts"
            sx={{ maxWidth: '440px', marginBottom: '25px' }}
          >
            {text}
          </Typography>
        ))}
      </Box>
      <Box
        className="box-2"
        sx={{
          marginTop: '100px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <ChatBubbleIcon
          sx={{
            color: LIGHT_GRAYISH_BLUE,
            fontSize: '80px',
            marginBottom: '7px',
          }}
        />
        <Typography
          variant="h3"
          sx={{ color: LIGHT_GRAYISH_BLUE, marginBottom: '10px' }}
        >
          Personalized app
        </Typography>
        {aboutUsTexts2.map((text) => (
          <Typography
            variant="subtitle1"
            key="texts"
            sx={{ maxWidth: '440px', marginBottom: '25px' }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </AboutUsContainer>
  );
};

export default AboutUs;
