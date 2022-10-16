// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import {FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGINGSENDER_ID, APPID} from './environments';
// TODO: Add SDKs for Firebase products th;at you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGINGSENDER_ID,
  appId: APPID,
};

// Initialize Firebase
let app;

if (firebase.apps.length===0){
	app = firebase.initializeApp(firebaseConfig);
} else{
	app = firebase.app()
}

const auth = firebase.auth();
export { auth }; 
export default firebase;