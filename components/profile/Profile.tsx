import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signUserOut } from "../../lib/fire_operations/authenticate";
import {
  getUserProfile,
  setUserProfile,
} from "../../lib/fire_operations/fire_profile";
import {getFromLocalStorage, saveToLocalStorage} from "../../lib/utils/local_storage";
import { UserProfileType } from "../../models/UserProfile";
import CircleProgress from "../animations/progress/circular_progress";
import MaterialBtn from "../form/buttons/MaterialBtn";
import TextArea from "../form/txt_inputs/TextArea";
import TextInput from "../form/txt_inputs/TextInput";
import ProfilePhoto from "./components/profile_photo/ProfilePhoto";
import styles from "./Profile.module.css";

export interface IProfileProps extends React.ComponentPropsWithoutRef<"div"> {}


const profileCacheKey = "userProfile";

const Profile: React.FC<IProfileProps> = ({ ...divProps }) => {
  
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [name, setName] = useState<string>("");
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatingErr, setUpdatingErr] = useState<string|null>(null);


  ///todo show loading based on isAuthReady and loading profile
  const router = useRouter();
  const { user, isAuthReady } = useContext(AuthContext);
  const loadUserProfile = async (user: User) => {
    //try cache 
    var userProfileIfAny : UserProfileType | null = getFromLocalStorage(profileCacheKey);
    
    if(userProfileIfAny == null){
    userProfileIfAny  = await getUserProfile(user);
    if(userProfileIfAny != null){
    saveToLocalStorage(profileCacheKey, userProfileIfAny);
    }
    }

    if(userProfileIfAny != null){
      setName(userProfileIfAny.name)
      setProfilePicUrl(userProfileIfAny.profilePicUrl)
      setAge(userProfileIfAny.age)
      setLocation(userProfileIfAny.location)
      setBio(userProfileIfAny.bio)
      setContact(userProfileIfAny.contact)
    }

    setProfile(userProfileIfAny);
  };


  useEffect(() => {
    if (user == null && isAuthReady) {
      router.push("/login");
    } else if (user != null && isAuthReady) {
      loadUserProfile(user);
    }
  }, []);


  const onUpdateProfileInfo = async() => {
    if(isUpdating)return;
    setIsUpdating(true);
    if(name.length == 0 
      || age.length == 0
      || bio.length == 0
      || location.length == 0
      || contact.length == 0
      ){
        setUpdatingErr("Please fill required fields");
        setIsUpdating(false);
      }else{
        var newProfile = {...profile!, name : name, age : age, location : location, contact : contact, bio : bio,};
        var isUpdated = await setUserProfile(user!, newProfile);
        saveToLocalStorage(profileCacheKey, newProfile);
        if(!isUpdated){
          setUpdatingErr("Failed to update your profile!");
        }else{
          setUpdatingErr(null);
        }
        setIsUpdating(false);
      }
  } 

  const clearErrorIfAny = ()=> {
    if(updatingErr)
    setUpdatingErr(null);
  }

  // update profile photo
  const onProfilePicUpdated = async(newPicUrl : string) => {
    setProfilePicUrl(newPicUrl);
    setIsUpdating(true);
    var newProfile = {...profile!, profilePicUrl : newPicUrl};
    var isUpdated = await setUserProfile(user!, newProfile);
    if(isUpdated)
    saveToLocalStorage(profileCacheKey, newProfile);
    setIsUpdating(false);
  }

  /// sign out
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const onSignOut = async() =>{
    if(isSigningOut)return;

    setIsSigningOut(true);
    var isSignedOut : boolean = await signUserOut();
    setIsSigningOut(false);
    if(isSignedOut)
    router.push("/");
  }
 

  return (
    <>
      <div {...divProps} className={`${styles.profileFormContainer}`}>
        <div className={`${styles.profileForm} card p-std bgAlt2`}>
          <div className={`${styles.profileHeadContainer}`}>
            <h4 className="white subtitle1 mb-std">
              My Profile
            </h4>
            {(!isAuthReady || profile == null) && (<CircleProgress />)}
            {(isAuthReady && profile != null) && (
              <MaterialBtn
              label="Sign Out"
              onClickFun={() => { onSignOut(); } }
              isBlock={false}
              isPrimary={false}
              isSecondary={true}
              isLoading={isSigningOut}
            />
            )}
          </div>
          
          <ProfilePhoto 
          isLightMode={false} 
          profilePhotoUrl={profilePicUrl} 
          userId={profile?.uid ?? ''}
          onProfilePicUpdated ={onProfilePicUpdated}
          />
          <TextInput
            isLightMode={false}
            label={"Name"}
            id={"id_full_name"}
            name={"full_name"}
            placeholder={"Enter your name"}
            hint={""}
            isOptional={false}
            isDisabled={false}
            value={name}
            onChangeTxt={(val : string) => {
              setName(val);
              clearErrorIfAny();
            }}
            hasError={false}
          />
          <TextInput
            isLightMode={false}
            label={"Age"}
            id={"id_age"}
            name={"age"}
            placeholder={"Age, e.g. 24"}
            hint={""}
            isOptional={false}
            isDisabled={false}  
            value={age}
            onChangeTxt={(val : string) => {
              setAge(val);
              clearErrorIfAny();
            }}
            hasError={false}
          />
          <TextInput
            isLightMode={false}
            label={"Location"}
            id={"id_location"}
            name={"location"}
            placeholder={"Country, City"}
            hint={""}
            isOptional={false}
            isDisabled={false}
            value={location}
            onChangeTxt={(val : string) => {
              setLocation(val);
              clearErrorIfAny();
            }}
            hasError={false}
          />
          <TextArea
            isLightMode={false}
            label={"Bio"}
            id={"id_bio"}
            name={"bio"}
            placeholder={"Tell us something about yourself"}
            hint={""}
            isOptional={false}
            isDisabled={false}  
            value={bio}
            onChangeTxt={(val : string) => {
              setBio(val);
              clearErrorIfAny();
            }}
            hasError={false}
          />

          <TextArea
            isLightMode={false}
            label={"Contact"}
            id={"id_contact"}
            name={"contact"}
            placeholder={"e.g. your social media handles"}
            hint={""}
            isOptional={true}
            isDisabled={false}  
            value={contact}
            onChangeTxt={(val : string) => {
              setContact(val);
              clearErrorIfAny();
            }}
            hasError={false}
          />

        {updatingErr && (
          <p className="body1 accent mb-std">
            {updatingErr}
          </p>)}

          <MaterialBtn
            label="Update my profile"
            onClickFun={() => { onUpdateProfileInfo(); } }
            isBlock={false}
            isPrimary={true}
            isSecondary={false}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
