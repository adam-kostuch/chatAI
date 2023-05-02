import { Container } from '@mui/material';
import * as React from 'react';
// import { useChattieContext } from '../../ChattieContext';
import ChatUsers from './ChatUsers';
import Search from './Search';

const NavbarChat = () => {
  // const { currentUser } = useChattieContext();

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
