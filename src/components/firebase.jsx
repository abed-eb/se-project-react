import firebase from "firebase";
import {STORAGE_KEY, WEB_PUSH_CERTIFICATE} from "./constants";

const firebaseConfig = {
    apiKey: "AIzaSyBPkNtNdBHnjC-QJ9dbrnFQO3rcf1rwYRk",
    authDomain: "sweet-home-773bb.firebaseapp.com",
    projectId: "sweet-home-773bb",
    storageBucket: "sweet-home-773bb.appspot.com",
    messagingSenderId: "872929672242",
    appId: "1:872929672242:web:4ca7dc26e3bc6490c6d02b",
    measurementId: "G-Z71M4YXBX4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.requestPermission()
    .then(()=>{
        console.log("push notification permission accepted.")
        return messaging.getToken({vapidKey:WEB_PUSH_CERTIFICATE})
    }).then((token)=>{
    // write code to send to server
    sessionStorage.setItem(STORAGE_KEY+'firebase-token',token)
    console.log(token)
}).catch(()=> {
    console.log("push notification permission denied.")
})


export const getMessaging = () => {
    return messaging
}

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         messaging.onMessage((payload) => {
//             console.log(payload)
//             resolve(payload);
//         });
//     });


