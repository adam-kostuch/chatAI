import { Firestore, addDoc, collection } from 'firebase/firestore';
import { Chatter, FirestoreMessage, Message } from 'src/types';

const useAddNewMessage = (
  db: Firestore,
  message: string,
  allMessages: Message[],
  activeUser: Chatter,
  activeChatter: Chatter
): Message[] => {
  const collectionRef = collection(db, 'users_chats');
  const newMessageData: FirestoreMessage = {
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

export default useAddNewMessage;
