import { storage } from "../firebase";
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";

export const uploadFiles = async (folder, files) => {
    const uploadedFiles = [];
    console.log(`uploading ${files}`);
    await Promise.all(files.map(async (file, index) => {
        try{
            console.log(`uploading ${index+1}th`);
            const extension = file.type.split('/')[1]
            const fileName = `${folder}/${Date.now()}.${extension}`;
            const storedFileRef = storageRef(storage, fileName);
            const uploadedFileTask = await uploadBytes(storedFileRef, file);
            const uploadedFileUrl = await getDownloadURL(uploadedFileTask.ref);
            uploadedFiles.push(uploadedFileUrl);
        }catch(error){
            console.log(`uploading ${index+1}th file failed with exception ${error}`);
        }
    })
    )
    return uploadedFiles;
}
