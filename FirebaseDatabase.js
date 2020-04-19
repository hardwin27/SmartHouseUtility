import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAOk2GDhZYDT1O4orv7Qe53yGa2bYBi6ys",
    authDomain: "smarthouseutility.firebaseapp.com",
    databaseURL: "https://smarthouseutility.firebaseio.com",
    projectId: "smarthouseutility",
    storageBucket: "smarthouseutility.appspot.com",
    messagingSenderId: "843716898808",
    appId: "1:843716898808:web:2bd16af1c44172e919300d",
    measurementId: "G-28C2TQEBG5"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;