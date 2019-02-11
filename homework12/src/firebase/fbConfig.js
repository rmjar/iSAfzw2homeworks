import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const config = {
    apiKey: "AIzaSyBrSBmvtEnpSgYcqXjX7nkZ5djKDoQ0WWE",
    authDomain: "receipes-001.firebaseapp.com",
    databaseURL: "https://receipes-001.firebaseio.com",
    projectId: "receipes-001",
    storageBucket: "receipes-001.appspot.com",
    messagingSenderId: "628100502631"
};
const app = firebase.initializeApp(config);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export default firebase;