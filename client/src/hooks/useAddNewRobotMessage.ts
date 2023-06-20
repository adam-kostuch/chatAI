import { Firestore, addDoc, collection } from 'firebase/firestore';
import { Chatter, RobotMessage } from 'src/types';

const useAddNewUsersMessage = async (
  db: Firestore,
  message: string,
  activeUser: Chatter
): Promise<RobotMessage> => {
  const collectionRef = collection(db, 'robot_chats');
  const newMessageData: RobotMessage = {
    message,
    isUsersMessage: true,
    date: new Date().getTime(),
    userEmail: activeUser.email,
    userName: activeUser.displayName,
  };

  await addDoc(collectionRef, newMessageData)
    .then(() => {
      console.log('Data added successfully to robot_chats collection');
    })
    .catch((error) => {
      throw new Error(`Error adding data to robot_chats collection ${error}`);
    });

  return {
    message,
    isUsersMessage: true,
    date: new Date().getTime(),
    userEmail: activeUser.email,
    userName: activeUser.displayName,
  };
};

export default useAddNewUsersMessage;
