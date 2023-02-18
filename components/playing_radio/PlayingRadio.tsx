import CurrentSongInfo from "./CurrentSong";
import styles from "./PlayingRadio.module.css";

export interface IPlayingRadioProps
  extends React.ComponentPropsWithoutRef<"section"> {}

const defaultRadioCoverPath =
  "../../assets/images/radio/default_playing_radio_cover.jpg";

const PlayingRadio: React.FC = ({ ...sectionProps }: IPlayingRadioProps) => {
  return (
    <div {...sectionProps} className={`containerParent`}>
      <div className={`container`}>
        <div className={`${styles.radioCover}`}>
          <img src={defaultRadioCoverPath} />
          <div className={`${styles.radioCoverInfo}`}>
            <div>
              <p className={`body2 white`}>Now listening</p>
              <h3 className={`headline2 whiteGlow`}>Radio One</h3>
              <p className={`overline primaryLight`}>
                #<span className="accent">relaxing</span> #
                <span className="primary">studyjams</span> #
                <span className="primaryDark">focus</span>
              </p>
            </div>
          </div>
        </div>
        <CurrentSongInfo />
      </div>
    </div>
  );
};

export default PlayingRadio;
