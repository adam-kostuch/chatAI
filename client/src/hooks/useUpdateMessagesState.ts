import { Firestore, doc, writeBatch } from 'firebase/firestore';

// updates multiple fields in collection
const useUpdateMessagesState = (db: Firestore, chatIds: string[]) => {
  try {
    const batch = writeBatch(db);

    chatIds.forEach((chatId) => {
      const docRef = doc(db, 'users_chats', chatId);

      batch.update(docRef, { isRead: true });
    });

    batch
      .commit()
      .then(() => {
        console.log('Batch update successful');
      })
      .catch((error) => {
        throw new Error(`Error updating documents ${error}`);
      });
  } catch (error) {
    throw new Error(`Error updating field ${error}`);
  }
};

export default useUpdateMessagesState;
