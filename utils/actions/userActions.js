import { child, get, getDatabase, ref,query,orderByChild,startAt,endAt } from "@firebase/database";
import { getFirebaseApp } from "../firebaseHelper"

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, `users/${userId}`);
        const snapShot = await get(userRef);
        return snapShot.val();
    } catch (error) {
        console.log(error);
    }

}

export const searchUsers = async (queryText) => {
    const searchTerm = queryText.toLowerCase();
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, 'users');
        const queryRef = query(userRef, orderByChild('firstLast'), startAt(searchTerm), endAt(searchTerm + '\uf8ff'));

        const snapShot = await get(queryRef);

        if (snapShot.exists()) {
            return snapShot.val();
        }
        return {};
    } catch (error) {
        console.log(error);
        throw error;
    }
}