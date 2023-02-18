import { useEffect, useState } from "react";
import IconFileInput from "../../../form/file_inputs/IconFileInput";
import styles from "./ProfilePhoto.module.css";
import { uploadProfilePhotoFile } from "../../../../lib/fire_operations/fire_profile";
import CircleProgress from "../../../animations/progress/circular_progress";

export interface IProfileProps extends React.ComponentPropsWithoutRef<"div"> {
  isLightMode: boolean;
  profilePhotoUrl: string | null;
  userId: string;
  onProfilePicUpdated: Function;
}

const ProfilePhoto: React.FC<IProfileProps> = ({
  isLightMode,
  profilePhotoUrl,
  userId,
  onProfilePicUpdated,
  ...divProps
}) => {
  
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const uploadNewPic = async (files: any) => {
    if (isUploading) return;
    setIsUploading(true);
    var uploadedPhotoUrlIfSuccess = await uploadProfilePhotoFile(userId, files);
    if (uploadedPhotoUrlIfSuccess != null) {
      onProfilePicUpdated(uploadedPhotoUrlIfSuccess);
    }
    setIsUploading(false);
  };

  return (
    <div {...divProps} className={`mt-std mb-std flexCol`}>
      {profilePhotoUrl && (
        <img
          src={profilePhotoUrl}
          alt="profile photo"
          className={`${styles.profilePhoto}`}
        />
      )}
      {!profilePhotoUrl && (
        <span
          className={` ${isLightMode ? "primaryDark" : "primaryLight"} ${
            styles.profilePhotoAvatar
          }`}
        >
          <i className="bi bi-person-circle"></i>
        </span>
      )}
      <div className="mt-std mb-std flexElem">
        {isUploading && (
          <>
            <CircleProgress />
            <div className="flexSpacerStd" />
          </>
        )}

        <IconFileInput
          isLightMode={isLightMode}
          lbl={"upload profile pic"}
          onComplete={(files: any) => {
            uploadNewPic(files);
          }}
          allowMultiple={false}
          fileType={"image/*"}
          areImages={true}
          areAudios={false}
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
