/* Här lägger vi in alla funktion vi kan behöva från firebase.
Exempel på dessa kan vara getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile */
import {createContext, useContext, useEffect, useState} from "react";
import {
    sendPasswordResetEmail, confirmPasswordReset,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, getAuth,
} from "firebase/auth";
import {firebaseConfig} from "./firebaseConfig";
import {get, getDatabase, onValue, ref} from "firebase/database";
import {initializeApp} from "firebase/app";
/*
TODO: add functions for reset password
 */
/*Import {useAuth} in the other files to use functions for authentication */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = createContext(null);
const db = getDatabase(app);
const PlantContext = createContext(null);
export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState({});
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }
    function updateProfileName(name) {
        return updateProfile(auth.currentUser, {displayName: name});
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current) => {
            //console.log("Auth", current);
            setUser(current);

        });
        return () => {
            unsubscribe();
        }
    }, []);
    return (<AuthContext.Provider
            value={{user, signIn, signUp, logOut, updateProfileName}}>
            {children}
        </AuthContext.Provider>
    );
}



 export function readUserData(user, path){
        let keys = [];
        const dbRef = ref(db, `users/${user.uid}/${path}`)
        return get(dbRef).then(snapshot => {
            console.log(snapshot.val())

            /*snapshot.forEach((child) => {
                keys.push(child.val())
            })
            console.log(keys)*/
            return snapshot.val();


        }).catch(err => {
            console.log(err)
        })
    }




export function useAuth() {
    return useContext(AuthContext);
}