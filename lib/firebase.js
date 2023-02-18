import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from  'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_apiKey,
  authDomain:process.env.NEXT_PUBLIC_authDomain,
  projectId:process.env.NEXT_PUBLIC_projectId,
  storageBucket:process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId:process.env.NEXT_PUBLIC_messagingSenderId,
  appId:process.env.NEXT_PUBLIC_appId,
  measurementId:process.env.NEXT_PUBLIC_measurementId,
};

// Initialize Firebase
let app; 
if (!app){
    app = initializeApp(firebaseConfig);
    
}


  
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);




/* TODO in front end
    export const analytics = getAnalytics(app);
*/

