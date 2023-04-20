/* Här lägger vi in alla funktion vi kan behöva från firebase.
Exempel på dessa kan vara getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile */
import {createContext, useContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile,
} from "firebase/auth";
import {auth} from "./firebaseConfig";
/*Import {useAuth} in the other files to use functions for authentication */

const AuthContext = createContext(null);
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
        return updateProfile(auth.current, {displayName: name});
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current) => {
            console.log("Auth", current);
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
export function useAuth() {
    return useContext(AuthContext);
}