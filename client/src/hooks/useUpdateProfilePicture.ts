import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from 'firebase/firestore';

const useUpdateProfilePicture = async (
  db: Firestore,
  userEmail: string,
  profileUrl: number
) => {
  const collectionRef = collection(db, 'users');

  try {
    const queryRef = query(collectionRef, where('email', '==', userEmail));
    const usersSnap = await getDocs(queryRef);
    const chatsIds: string[] = [];

    // email is unique so we don't rely need to use loop, but it is safer
    usersSnap.forEach((document) => {
      chatsIds.push(document.id);
    });

    const batch = writeBatch(db);

    chatsIds.forEach((chatId) => {
      const docRef = doc(db, 'users', chatId);

      batch.update(docRef, { profileUrl });
    });

    batch
      .commit()
      .then(() => {
        console.log('Profile URL update successful');
      })
      .catch((error) => {
        throw new Error(`Error updating profile URL ${error}`);
      });
  } catch (error) {
    throw new Error(`Failed to update profile URL ${error}`);
  }
};

export default useUpdateProfilePicture;
