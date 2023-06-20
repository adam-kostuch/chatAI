import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { RealtimeMessage, FirestoreRealtimeMessage } from 'src/types';

const useQueryUsersMessages = async (
  db: Firestore,
  userEmail: string,
  chatterEmail: string
): Promise<[RealtimeMessage[], string[]]> => {
  const collectionRef = collection(db, 'users_chats');

  // TODO: it might be good to save in cache information about chat messages (for one session)
  try {
    // since the email is already a unique field, we can rely only on that
    const queryRef = query(
      collectionRef,
      where('userEmail', 'in', [userEmail, chatterEmail]),
      where('chatterEmail', 'in', [userEmail, chatterEmail])
    );
    const userChatsSnap = await getDocs(queryRef);
    const userChats: RealtimeMessage[] = [];
    const chatsIds: string[] = [];

    userChatsSnap.forEach((document) => {
      const userChat = document.data() as FirestoreRealtimeMessage;

      userChats.push({
        isUsersMessage: userChat.userEmail === userEmail,
        message: userChat.message,
        date: userChat.date,
      });

      if (userChat.chatterEmail !== chatterEmail) {
        chatsIds.push(document.id);
      }
    });

    // sorting descending so that we display messages properly by timestamp
    return [
      userChats.sort(
        (prevChat, currentChat) => currentChat.date - prevChat.date
      ),
      chatsIds,
    ];
  } catch {
    return [[], []];
  }
};

export default useQueryUsersMessages;
