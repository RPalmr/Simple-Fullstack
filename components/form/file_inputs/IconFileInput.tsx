
import { useState, useRef } from "react";
import {compressImages} from "../../../lib/utils/image_compress";

export interface IIconFileInputProps extends React.ComponentPropsWithoutRef<"label"> {
    lbl :string,
    allowMultiple : boolean,
    onComplete : Function,
    isLightMode : boolean,
    fileType : string,
    areImages : boolean,
    areAudios : boolean
}

const IconFileInput: React.FC<IIconFileInputProps> = ({ lbl, allowMultiple, onComplete, isLightMode, fileType, areImages, areAudios, ...labelProps }) => {
    const inputElemRef = useRef<HTMLInputElement>(null)

    const onNewImageSubmitted = async (submittedFiles : FileList | null ) => {
        if(submittedFiles == null)return;

        let onlyImagesAsFiles = [];
        for (let index = 0; index < submittedFiles.length; index++) {
          let aFile = submittedFiles[index];
          if (aFile.type.startsWith("image/")) {
            onlyImagesAsFiles.push(aFile);
          }
        }
      
        const files = await compressImages(onlyImagesAsFiles);
        onComplete(files);
    
    }

    const onNewAudioFileSubmitted = async (submittedFiles : FileList | null ) => {
      if(submittedFiles == null)return;

      let onlyAudioAsFiles = [];
      for (let index = 0; index < submittedFiles.length; index++) {
        let aFile = submittedFiles[index];
        if (aFile.type.startsWith("audio/")) {
          onlyAudioAsFiles.push(aFile);
        }
      }

      onComplete(onlyAudioAsFiles);
  
  }

    return (
        <label {...labelProps} className={`flexElem clickableElem lblFile lblFileBtn ${isLightMode ? 'bgOffWhite' : 'bgBlack'}`}>
                <span className={`${isLightMode ? 'black' : 'white'} mr-sm`}>
                <i className="bi bi-file-earmark-arrow-up"></i>
                </span>
                <span  className={`button ${isLightMode ? 'black' : 'primaryLight'}`}>{lbl}</span>
                <input
                    id="id_img_input"
                    className="form-element-field"
                    type="file"
                    name="img_input"
                    accept={fileType}
                    multiple={allowMultiple}
                    ref={inputElemRef}
                    onChange={
                        (e) => {
                            let uploadedFiles = e.target.files;
                            console.log("file received");
                            if(areImages)
                            onNewImageSubmitted(uploadedFiles);
                            else if(areAudios)
                            onNewAudioFileSubmitted(uploadedFiles);
                          }
                    } ></input>
            </label>
    )
}

export default IconFileInput