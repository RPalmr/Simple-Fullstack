import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { profileConverter, UserProfileType } from "../../models/UserProfile";
import {firestore,} from "../firebase";
import {uploadFiles} from "../utils/file_uploads";

const usersCollection = "users";
const profilePicsCollection = "profile_photos";
const profilePicsSubCollection = "user_photos";

export const getUserProfile = async (user : User)  => {
    const docRef = doc(firestore, usersCollection, user.uid)
    .withConverter(profileConverter);;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const profile : UserProfileType = docSnap.data();
        return profile;
      } else {
       return null;
    }
} 

export const setUserProfile = async (user: User, profile : UserProfileType ) => {
    try {
        const ref = doc(firestore, usersCollection, user.uid).withConverter(profileConverter);
        await setDoc(ref, profile);
        return true;
    } catch (error) {
        console.log(`=== setUserProfile exception ${error} ===`);
        return false;
    }
}


export const uploadProfilePhotoFile = async (userId : string, photoFileArr : any) => {
    try {
        const folderName =
            profilePicsCollection +
            "/" +
            userId +
            "/" +
            profilePicsSubCollection;
        const uploadedFileArr = await uploadFiles(folderName, photoFileArr);
        return uploadedFileArr[0];
    } catch (error) {
        console.log(`uploadProfilePhotoFile exception ${error}`);
        return null;
    }
};