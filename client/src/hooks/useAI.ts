import { Firestore, addDoc, collection } from 'firebase/firestore';
import ChattieApiClient from 'src/clients/ChattieApiClient';
import { Chatter, RobotMessage } from 'src/types';

const useAI = async (
  db: Firestore,
  apiClient: ChattieApiClient,
  message: string,
  activeUser: Chatter
) => {
  const data = await apiClient.ai(message, `session-${activeUser.email}`);

  const collectionRef = collection(db, 'robot_chats');
  const newMessageData: RobotMessage = {
    isUsersMessage: false,
    message: data as string,
    date: new Date().getTime(),
    userEmail: activeUser.email,
    userName: activeUser.displayName,
  };

  addDoc(collectionRef, newMessageData)
    .then(() => {
      console.log('Data added successfully to robot_chats collection');
    })
    .catch((error) => {
      throw new Error(`Error adding data to robot_chats collection ${error}`);
    });

  return {
    message: data as string,
    isUsersMessage: false,
    date: new Date().getTime(),
    userEmail: activeUser.email,
    userName: activeUser.displayName,
  };
};

export default useAI;
