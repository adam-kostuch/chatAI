import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Chatter } from 'src/types';

const useUserData = async (db: Firestore, email: string) => {
  let user = {} as Chatter;

  try {
    const usersCollection = collection(db, 'users');
    const usersQuery = query(usersCollection, where('email', '==', email));
    const usersQuerySnapshot = await getDocs(usersQuery);

    if (!usersQuerySnapshot.empty) {
      usersQuerySnapshot.forEach((userDoc) => {
        user = userDoc.data() as Chatter;
      });
    } else {
      console.log('User not found');
    }
  } catch (error) {
    throw new Error(`Error finding email ${error}`);
  }

  return user;
};

export default useUserData;
