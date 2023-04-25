// import React from 'react';
// import { useChattieContext } from '../../ChattieContext';
// import {
//   addDoc,
//   collection,
//   // onSnapshot,
//   // query,
//   serverTimestamp,
//   // where,
// } from 'firebase/firestore';

// const RealtimeChat = () => {
//   const [newMessage, setNewMessage] = React.useState('');
//   const { db } = useChattieContext();

//   const messagesRef = collection(db, 'messages');

//   // useEffect(() => {
//   //   const queryMessages = query;
//   //   onSnapshot(messagesRef, where[]);
//   // onSnapshot(which collection exist in, different ports, )
//   // where "I want a query where they where in"
//   // }, []);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (newMessage === '') return;
//     await addDoc(messagesRef, {
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       // user: auth.currentUser.displayName,
//       user: 'Adas',
//     });

//     setNewMessage('');
//   };

//   return (
//     <div className="chat-app">
//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           className="new-message-input"
//           placeholder="Type your message here..."
//           onChange={(e) => setNewMessage(e.target.value)}
//           value={newMessage}
//         />
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RealtimeChat;

import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import Search from './Search';
import Chats from './Chats';

const RealtimeChat = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Realtime Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        className="chat-section"
        sx={{ width: '100%', height: '100vh' }}
      >
        <Search />
        <Chats />
      </Grid>
    </>
  );
};

export default RealtimeChat;
