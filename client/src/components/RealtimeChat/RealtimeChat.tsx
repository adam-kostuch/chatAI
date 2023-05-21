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

import { FC } from 'react';
import { Container } from '@mui/material';
import NavbarChat from './NavbarChat';
import Chats from './Chats';
import useCheckAuthentication from 'src/hooks/useCheckAuthentication';

const RealtimeChat: FC = () => {
  useCheckAuthentication();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}
    >
      <NavbarChat />
      <Chats />
    </Container>
  );
};

export default RealtimeChat;
