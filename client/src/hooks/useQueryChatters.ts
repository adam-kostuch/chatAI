import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Chatter, FirestoreRealtimeMessage } from 'src/types';

const useQueryChatters = async (
  db: Firestore,
  userEmail: string,
  chatterEmail: string
): Promise<Chatter[]> => {
  try {
    const usersChatsRef = collection(db, 'users_chats');
    const usersRef = collection(db, 'users');
    const userChatsQueryRef = query(
      usersChatsRef,
      where('userEmail', '==', userEmail)
    );
    const chatterQueryRef = query(
      usersChatsRef,
      where('chatterEmail', '==', userEmail)
    );

    const usersQueryRef = query(usersRef, where('email', '==', chatterEmail));
    const [usersQuerySnap, userChatsSnap, chatterChatsSnap] = await Promise.all(
      [
        getDocs(usersQueryRef),
        getDocs(userChatsQueryRef),
        getDocs(chatterQueryRef),
      ]
    );

    const mergedChatsSnap = [...userChatsSnap.docs, ...chatterChatsSnap.docs];
    const mappedUsers = [...usersQuerySnap.docs];
    const queriedChatters: Chatter[] = [];

    console.log({ m: mappedUsers[0].data() });

    if (mergedChatsSnap.length > 0) {
      mergedChatsSnap.forEach((document) => {
        const mergedChat = document.data() as FirestoreRealtimeMessage;

        if (
          !queriedChatters.some(
            (chatter) => chatter.email === mergedChat.chatterEmail
          )
        ) {
          queriedChatters.push({
            displayName: mergedChat.chatterName,
            email: mergedChat.chatterEmail,
            profileUrl: mappedUsers
              .filter((user) => user.data().email === chatterEmail)[0]
              .data().profileUrl,
            hasUnreadMessages: mergedChatsSnap.some((doc) => {
              const chat = doc.data() as FirestoreRealtimeMessage;

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
            profileUrl: user.profileUrl,
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
