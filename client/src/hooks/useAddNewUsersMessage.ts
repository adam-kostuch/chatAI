import { Firestore, addDoc, collection } from 'firebase/firestore';
import { Chatter, FirestoreRealtimeMessage, RealtimeMessage } from 'src/types';

const useAddNewUsersMessage = (
  db: Firestore,
  message: string,
  allMessages: RealtimeMessage[],
  activeUser: Chatter,
  activeChatter: Chatter
): RealtimeMessage[] => {
  const collectionRef = collection(db, 'users_chats');
  const newMessageData: FirestoreRealtimeMessage = {
    userEmail: activeUser.email,
    userName: activeUser.displayName,
    chatterEmail: activeChatter.email,
    chatterName: activeChatter.displayName,
    date: new Date().getTime(),
    message,
    isRead: false,
  };

  addDoc(collectionRef, newMessageData)
    .then(() => {
      console.log('Data added successfully to users_chats collection');
    })
    .catch((error) => {
      throw new Error(`Error adding data to users_chats collection ${error}`);
    });

  return [
    ...allMessages,
    {
      message,
      date: new Date().getTime(),
      isUsersMessage: true,
    },
  ].sort((prevChat, currentChat) => currentChat.date - prevChat.date);
};

export default useAddNewUsersMessage;
