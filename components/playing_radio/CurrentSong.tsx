import SoundBars from "../animations/sound_bars/SoundBars";
import styles from "./CurrentSongInfo.module.css";

export interface ICurrentSongInfoProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const defaultRadioCoverPath =
  "../../assets/images/radio/default_playing_radio_cover.jpg";

const CurrentSongInfo: React.FC = ({ ...divProps }: ICurrentSongInfoProps) => {
  return (
    <div { ...divProps } className={`${styles.currentSongInfo} card p-std`}>
    <div>
      <div>
        <SoundBars />
        <span className="subtitle1 white">Midnight Tunes</span>
      </div>
      <p className="subtitle2 primaryLight">by Reece P</p>
    </div>
    <div>
      <span className="headline6 primaryDark clickableElem">
        <i className="bi bi-volume-mute-fill"></i>
      </span>
    </div>
  </div>
  );
};

export default CurrentSongInfo;


