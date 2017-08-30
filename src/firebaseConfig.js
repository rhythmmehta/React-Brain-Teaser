import * as firebase from "firebase";

export const init = () => {
let config= {
    apiKey: "AIzaSyAtmr3ypPWZxh8SZ3HCM7CmQwTuP7DNwzM",
    authDomain: "rhythm-styku-challenge.firebaseapp.com",
    databaseURL: "https://rhythm-styku-challenge.firebaseio.com",
    projectId: "rhythm-styku-challenge",
    storageBucket: "rhythm-styku-challenge.appspot.com",
    messagingSenderId: "258699950287"
}
firebase.initializeApp(config);
}
