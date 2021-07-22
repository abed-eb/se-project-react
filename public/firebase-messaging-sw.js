importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');


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

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }
//
// firebase.initializeApp({
//     messagingSenderId: "872929672242",
//   })
//
// const initMessaging = firebase.messaging()