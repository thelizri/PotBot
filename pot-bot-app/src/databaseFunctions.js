import {db} from "./firebaseConfig";
import {set, get, ref, push, update, child} from "firebase/database";
import {auth} from "./firebaseConfig";



async function writeUserData( name, email ) {
        //const newPostKey = push(child(ref(db), 'users/')).key;

        return await set(ref(db, 'users/' + auth.currentUser.uid), {
            name: name,
            email: email,
            plants: [null]//maybe add this later
        })
    }
async function readUserData(user, path) {
    return (await get(ref(db, `users/${user.uid}/${path}`)));
}
async function readAllUserData() {
    return (await get(ref(db, 'users/' + auth.currentUser.uid)));
}
export {writeUserData, readUserData, readAllUserData};
