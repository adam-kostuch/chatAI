import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { RobotMessage } from 'src/types';

const useQueryRobotMessages = async (
  db: Firestore,
  userEmail: string
): Promise<RobotMessage[]> => {
  const collectionRef = collection(db, 'robot_chats');

  try {
    // since the email is already a unique field, we can rely only on that
    const queryRef = query(collectionRef, where('userEmail', '==', userEmail));
    const robotChatsSnap = await getDocs(queryRef);
    const robotChats = robotChatsSnap.docs.map((doc) =>
      doc.data()
    ) as RobotMessage[];

    // sorting descending so that we display messages properly by timestamp
    return robotChats.sort(
      (prevChat, currentChat) => currentChat.date - prevChat.date
    );
  } catch {
    return [];
  }
};

export default useQueryRobotMessages;
