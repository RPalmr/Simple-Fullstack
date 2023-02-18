import imageCompression from "browser-image-compression";

export const compressImages = async (ogFiles) => {
    const compressedFiles = [];
    try {
        await Promise.all(ogFiles.map(async (imageFile, index) => {
            const options = {
                maxSizeMB: 0.5,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(imageFile, options)
            compressedFiles.push(compressedFile)
        }))
        return compressedFiles;
    } catch (error) {
        return ogFiles
    }

}


