import {getDatabase,set, get, ref, push, update, child, onValue} from "firebase/database";
import {firebaseConfig} from "./firebaseConfig";
import {useState} from "react";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app);
async function writeUserData( name, email ) {
        //const newPostKey = push(child(ref(db), 'users/')).key;

        return await set(ref(db, 'users/' + auth.currentUser.uid), {
            name: name,
            email: email,
            plants: []//maybe add this later
        })
    }
async function readUserData(user, path) {
    let keys = [];
    const dbRef = ref(db, `users/${user.uid}/${path}`)
    get(dbRef).then(snapshot => {
        console.log(snapshot.key)

        snapshot.forEach((child) => {
            keys.push(child.key)
        })
        console.log(keys)
        return keys;

    }).catch(err => {
        console.log(err)
    })

}
/*
* data is written as this example of a plant measureData object {m1, m2,...}
* and m1 is then as {timestamp: '2023-04-24 15:00', temp: 22, humidity: 50, ...}
*
* */
async function uploadPlantData(user, path, data) {
    const dbRef = await ref(db, `users/${user.uid}/${path}`);
    await update(dbRef, data);

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
    })

}
async function readAllUserData() {
    return (await get(ref(db, 'users/' + auth.currentUser.uid)));
}
function hasPlants(user){
    const dbRef = ref(db, `users/${user.uid}`);


    return get(child(dbRef,`/plants`)).then((response) => {
        //console.log(response.exists())
        return response.exists();
    }).catch(err => console.error(err.message));
}
export {writeUserData, readUserData, readAllUserData, uploadPlantData, addNewPlant, hasPlants};
