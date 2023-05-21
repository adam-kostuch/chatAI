import { FC } from 'react';
import { Container } from '@mui/material';
import ChatUsers from './ChatUsers';
import Search from './Search';

const NavbarChat: FC = () => {
  return (
    <Container
      sx={{
        width: '450px',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <Search />
      <ChatUsers />
    </Container>
  );
};

export default NavbarChat;
