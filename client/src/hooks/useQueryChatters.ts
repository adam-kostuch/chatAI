import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Chatter, FirestoreMessage } from 'src/types';

const useQueryChatters = async (
  db: Firestore,
  userEmail: string,
  chatterEmail: string
): Promise<Chatter[]> => {
  try {
    const usersChatsRef = collection(db, 'users_chats');
    const userQueryRef = query(
      usersChatsRef,
      where('userEmail', '==', userEmail)
    );
    const chatterQueryRef = query(
      usersChatsRef,
      where('chatterEmail', '==', userEmail)
    );
    const [userChatsSnap, chatterChatsSnap] = await Promise.all([
      getDocs(userQueryRef),
      getDocs(chatterQueryRef),
    ]);
    const mergedChatsSnap = [...userChatsSnap.docs, ...chatterChatsSnap.docs];
    const queriedChatters: Chatter[] = [];

    if (mergedChatsSnap.length > 0) {
      mergedChatsSnap.forEach((document) => {
        const mergedChat = document.data() as FirestoreMessage;

        if (
          !queriedChatters.some(
            (chatter) => chatter.email === mergedChat.chatterEmail
          )
        ) {
          queriedChatters.push({
            displayName: mergedChat.chatterName,
            email: mergedChat.chatterEmail,
            profileUrl: '',
            hasUnreadMessages: mergedChatsSnap.some((doc) => {
              const chat = doc.data() as FirestoreMessage;

              return !chat.isRead && chat.userEmail === mergedChat.chatterEmail;
            }),
          });
        }
      });
    } else {
      const usersRef = collection(db, 'users');
      const usersQueryRef = query(usersRef, where('email', '==', chatterEmail));
      const usersSnap = await getDocs(usersQueryRef);

      usersSnap.forEach((document) => {
        const user = document.data() as Chatter;

        if (!queriedChatters.some((chatter) => chatter.email === user.email)) {
          queriedChatters.push({
            displayName: user.displayName,
            email: user.email,
            profileUrl: '',
            hasUnreadMessages: false,
          });
        }
      });
    }

    // sorting the array based on the the user display name
    // also we filter if the queried user is not active user
    const chatters = queriedChatters
      .filter((chatter) => chatter.email !== userEmail)
      .sort((prevChat, currentChat) => {
        const nameA = prevChat.displayName.toUpperCase();
        const nameB = currentChat.displayName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    return chatters;
  } catch (error) {
    return [];
    throw new Error(`Error reading documents ${error}`);
  }
};

export default useQueryChatters;
