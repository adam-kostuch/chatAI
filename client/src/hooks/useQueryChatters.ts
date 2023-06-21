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
  userEmail: string
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

    const [usersQuerySnap, userChatsSnap, chatterChatsSnap] = await Promise.all(
      [getDocs(usersRef), getDocs(userChatsQueryRef), getDocs(chatterQueryRef)]
    );

    const mergedChatsSnap = [...userChatsSnap.docs, ...chatterChatsSnap.docs];
    const mappedUsers = usersQuerySnap.docs.map((snapshot) => snapshot.data());
    const queriedChatters: Chatter[] = [];

    if (mergedChatsSnap.length > 0) {
      mergedChatsSnap.forEach((document) => {
        const mergedChat = document.data() as FirestoreRealtimeMessage;

        if (
          !queriedChatters.some(
            (chatter) => chatter.email === mergedChat.userEmail
          )
        ) {
          const email =
            mergedChat.userEmail === userEmail
              ? mergedChat.chatterEmail
              : mergedChat.userEmail;
          const displayName =
            mergedChat.userEmail === userEmail
              ? mergedChat.chatterName
              : mergedChat.userName;

          queriedChatters.push({
            displayName,
            email,
            profileUrl: mappedUsers.filter(
              (user) => user.email === mergedChat.chatterEmail
            )[0]?.profileUrl,
            hasUnreadMessages: mergedChatsSnap
              .filter((chat) => chat.data().chatterEmail === userEmail)
              .some(
                (chat) =>
                  !chat.data().isRead &&
                  chat.data().userEmail === mergedChat.chatterEmail
              ),
          });
        }
      });
    } else {
      usersQuerySnap.forEach((document) => {
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

    const uniqueChatters = Array.from(
      new Set(queriedChatters.map((chatter) => chatter.email))
    ).map((email) => {
      return queriedChatters.find((chatter) => chatter.email === email);
    }) as Chatter[];

    // sorting the array based on the the user display name
    // also we filter if the queried user is not active user
    const chatters = uniqueChatters
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
    throw new Error(`Error reading documents ${error}`);
  }
};

export default useQueryChatters;
