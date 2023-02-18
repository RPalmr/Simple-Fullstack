import { User } from "firebase/auth";
import { songConverter, SongType } from "../../models/Song";
import { uploadFiles } from "../utils/file_uploads";
import { doc, setDoc , collection } from "firebase/firestore";
import {firestore,} from "../firebase";

const songsCollection = "songs";
const mySongsSubCollection = "my_songs";
export const uploadSongFile = async (userId : string, songFileArr : any) => {
    try {
        const folderName =
            songsCollection +
            "/" +
            userId +
            "/" +
            mySongsSubCollection;
        const uploadedFileArr = await uploadFiles(folderName, songFileArr);
        if(uploadedFileArr.length == 0 )return null;

        return uploadedFileArr[0];
    } catch (error) {
        console.log(`uploadSongFile exception ${error}`);
        return null;
    }
};

export const saveUsersSong = async (user: User, song : SongType ) => {
    try {
       const ref =  doc(
        collection(firestore, songsCollection, user.uid, songsCollection).withConverter(songConverter)
        );
        await setDoc(ref, {...song, id:ref.id,})
        return true;
    } catch (error) {
        console.log(`=== saveUsersSong exception ${error} ===`);
        return false;
    }
}