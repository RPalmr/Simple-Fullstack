import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

const INVALID_EMAIL =  "auth/invalid-email";
const INVALID_PASSWORD =  "auth/wrong-password";

export const login = (email  :string, password : string, callbackOnLogin : Function, callbackOnErr : Function ) => {
 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    callbackOnLogin(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    var errMsg = "An unknown err occurred";
    if(errorCode == INVALID_EMAIL || errorCode == INVALID_PASSWORD)
        errMsg = "Invalid email / password";
    callbackOnErr(errMsg);
  });

}

export const register = (email  :string, password : string, callbackOnRegister : Function, callbackOnErr : Function ) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    callbackOnRegister(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    var errMsg = "An unknown err occurred";
    if(errorCode == INVALID_EMAIL || errorCode == INVALID_PASSWORD)
        errMsg = "Invalid email / password";
    callbackOnErr(errMsg);
  });

}

export const signUserOut = async() => {
    try{
      await auth.signOut();
      return true;
    }catch(error){
      console.log(`failed to sign out ${error}`);
      return false;
    }
}