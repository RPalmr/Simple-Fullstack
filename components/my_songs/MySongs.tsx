import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SongVibes, SongVibesChoices } from "../../models/SongVibes";
import CircleProgress from "../animations/progress/circular_progress";
import MaterialBtn from "../form/buttons/MaterialBtn";
import RadioBtn from "../form/buttons/RadioBtn";
import IconFileInput from "../form/file_inputs/IconFileInput";
import TextArea from "../form/txt_inputs/TextArea";
import TextInput from "../form/txt_inputs/TextInput";
import styles from "./MySongs.module.css";
import {saveUsersSong, uploadSongFile} from "../../lib/fire_operations/fire_songs";
import { getEmptySong } from "../../models/Song";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

export interface IMySongsProps extends React.ComponentPropsWithoutRef<"div"> {}

const MySongs: React.FC<IMySongsProps> = ({ ...divProps }) => {
  const [checkedVibe, setCheckedVibe] = useState<SongVibes>(SongVibes.relaxing);
  const [songName, setSongName] = useState<string>("");
  const [songFeatures, setSongFeatures] = useState<string>("");
  const [songInfo, setSongInfo] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isUploadingSong, setIsUploadingSong] = useState<boolean>(false);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  

  const { user, isAuthReady } = useContext(AuthContext);
  const router = useRouter();

  const clearErrorsIfAny = () => {
    if (errMsg != null) setErrMsg(null);
  };

  const onUploadSongClicked = async() => {
    if (isUploadingSong || user == null) return;
    setIsUploadingSong(true);

    if (songName.length < 3 || songInfo.length < 3 || songFeatures.length < 3) {
      setErrMsg("Please provide more info about the song");
      setIsUploadingSong(false);
      return;
    }

    if (songUrl == null) {
      setErrMsg("You have not uploaded the song!");
      setIsUploadingSong(false);
      return;
    }

    var song = getEmptySong(user?.uid ?? "");
    song.about = songInfo;
    song.features = songFeatures;
    song.name = songName;
    song.songUrl = songUrl;
    song.vibe = checkedVibe;
    var isSuccessful = await saveUsersSong(user, song);
    if(isSuccessful){
      toast.success('You have uploaded a song!',  {
        icon: '👏👏👏',
        duration: 3000
      });
      setIsUploadingSong(false);
      router.push('/');
    }else{
      setErrMsg("Failed to save your song!");
      setIsUploadingSong(false);
    }
  };

  const [isUploadingSongFile, setIsUploadingSongFile] = useState<boolean>(false);
  const onUploadSongFile  = async (files: any) => {
    if (isUploadingSongFile || user == null) return;
    setIsUploadingSongFile(true);
    clearErrorsIfAny();
    var songUrlIfUploadSuccess = await uploadSongFile(user!.uid, files);
    if (songUrlIfUploadSuccess != null) {
      toast.success('Song file uploaded!',  {
        icon: '👏',
        duration: 3000
      });
      setSongUrl(songUrlIfUploadSuccess);
    }
    setIsUploadingSongFile(false);
  };

  return (
    <>
      <div {...divProps} className={`${styles.myMusicContainer}`}>
        <div className="card p-std bgAlt2">
          <h4 className="white subtitle1 mb-sm">New Song</h4>
          <p className="primaryLight body2 mb-std">Get Discovered @Cosmic</p>
          <TextInput
            isLightMode={false}
            label={"Song Name"}
            id={"id_song_name"}
            name={"song_name"}
            placeholder={"Enter the song name"}
            hint={""}
            value={songName}
            isOptional={false}
            isDisabled={false}
            onChangeTxt={(name: string) => {
              setSongName(name);
              clearErrorsIfAny();
            }}
            hasError={false}
          />
          <div className="mt-std mb-std flexElem">
            {isUploadingSongFile && (
              <>
                <CircleProgress />
                <div className="flexSpacerStd" />
              </>
            )}

            <IconFileInput
              isLightMode={true}
              lbl={"upload "}
              onComplete={(files: any) => {
                onUploadSongFile(files);
              }}
              areImages={false}
              allowMultiple={false}
              areAudios={true}
              fileType={"audio/mp3, audio/ogg, audio/wav"}
            />

            {songUrl != null && (
              <span className="mt-std caption primaryLight">
               <i className="bi bi-check-circle-fill"></i> Uploaded song file successfully
              </span>
            )}
          </div>

          <div className="flexSpacerMd"></div>
          <TextArea
            isLightMode={false}
            label={"Features & Credit"}
            id={"id_credit"}
            name={"credit"}
            placeholder={"Who else made this possible"}
            hint={""}
            value={songFeatures}
            isOptional={false}
            isDisabled={false}
            onChangeTxt={(features: string) => {
              setSongFeatures(features);
              clearErrorsIfAny();
            }}
            hasError={false}
          />

          <TextArea
            isLightMode={false}
            label={"About"}
            id={"id_about"}
            name={"about"}
            placeholder={"a brief about this song"}
            hint={""}
            value={songInfo}
            isOptional={false}
            isDisabled={false}
            onChangeTxt={(about: string) => {
              setSongInfo(about);
              clearErrorsIfAny();
            }}
            hasError={false}
          />
          <RadioBtn
            label={"Vibes"}
            choices={SongVibesChoices}
            id={"id_song_vibe"}
            name={"song_vibe"}
            isDisabled={false}
            hasError={false}
            checked={checkedVibe}
            setChecked={setCheckedVibe}
          />

          <p className="accent body2 mt-sm mb-sm">{errMsg}</p>

          <div className="flexSpacerMd"></div>
          <MaterialBtn
            label="Upload my song"
            onClickFun={onUploadSongClicked}
            isBlock={false}
            isPrimary={true}
            isSecondary={false}
            isLoading={isUploadingSong}
          />

          <p className="overline primaryDark mt-sm">
            *By uploading, you are declaring that you own the rights to the song
            you upload.
          </p>
        </div>
      </div>
    </>
  );
};

export default MySongs;
