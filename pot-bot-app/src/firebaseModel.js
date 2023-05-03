/* Här lägger vi in alla funktion vi kan behöva från firebase.
Exempel på dessa kan vara getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile */
import {createContext, useContext, useEffect, useState} from "react";
import {
    sendPasswordResetEmail, confirmPasswordReset,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, getAuth,
} from "firebase/auth";
import {firebaseConfig} from "./firebaseConfig";
import {child, get, getDatabase, onValue, ref, set, update} from "firebase/database";
import {initializeApp} from "firebase/app";
/*
TODO: add functions for reset password
 */
/*Import {useAuth} in the other files to use functions for authentication */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = createContext(null);
const db = getDatabase(app);
export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState({});
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    async function signUp(email, password) {
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

/*
* Used when creating a user to webapp. This creates a user folder for this user*/
async function writeUserData(name, email) {
    return await set(ref(db, 'users/' + auth.currentUser.uid), {
        name: name,
        email: email,
        plants: []//maybe add this later
    })
}
 function readUserData(user, path){
        const dbRef = ref(db, `users/${user.uid}/${path}`)
        return get(dbRef).then(snapshot => {
            //console.log(snapshot.val())
            return snapshot.val();
        }).catch(err => {
            console.log(err)
        })
}
async function addNewPlant(user, path, plantName) {
    const dbRef = await ref(db, `users/${user.uid}`);
    //Check if the user already has this plant
    //Maybe we should have a error handler here to handle if user has this plant name
    //so the user can add another plant with this name
    await get(child(dbRef,`/${path}/${plantName}` )).then((response) => {
        if(response.exists()){
            console.log(response.val())
            //Plant with this name already exists
        }
        else{
            console.log("no data found")
            //Create folder with plants and a folder with this plant name
            set(ref(db, `users/${user.uid}/${path}/${plantName}`), {
                SSID: 'plantID',
                measureData: 'To be added',
                plantRecommendedVitals: [] }
            )
        }
    }).catch(err => console.error(err))
}
/*
* data is written as this example of a plant measureData object {m1, m2,...}
* and m1 is then as {timestamp: '2023-04-24 15:00', temp: 22, humidity: 50, ...}
*
* */
async function updatePlantData(user, path, data) {
    const dbRef = await ref(db, `users/${user.uid}/${path}`);
    return await update(dbRef, data);
}
/*
* boolean to check if user has a plant registred*/
async function hasPlants(user){
    const dbRef = ref(db, `users/${user.uid}`);
    try {
        const response = await get(child(dbRef, `/plants`));
        return response.exists();
    } catch (err) {
        return console.error(err.message);
    }
}

async function savePlantToUser(user, plantName, plantData) {
    /* 
     Gets the user's current plants
     */
    const userPlantsRef = ref(db, `users/${user.uid}/plants`);
    const userPlantsSnapshot = await get(userPlantsRef);
    const userPlants = userPlantsSnapshot.val() || {};
  
    /*Checks if the plant is already in the user's plants
    */
    if (userPlants.hasOwnProperty(plantName)) {
      console.log(`Plant with name '${plantName}' already exists in user's plants.`);
      return;
    }
  
    /* Adds the new plant to the user's plants
    */
    userPlants[plantName] = plantData;
    await set(userPlantsRef, userPlants);
    console.log(`Plant with name '${plantName}' added to user's plants.`);
  }
  

export {hasPlants, updatePlantData, addNewPlant,readUserData,writeUserData}
export function useAuth() {
    return useContext(AuthContext);
}