import Link from "next/link";
import styles from "./Radios.module.css";

export interface IRadiosProps
  extends React.ComponentPropsWithoutRef<"section"> {}

const chillMusicCoverPath =
  "../../assets/images/radio/chill_music_radio_cover1.jpg";

const raveMusicCoverPath =
  "../../assets/images/radio/rave_music_radio_cover1.jpg";

const sadLoveMusicCoverPath =
  "../../assets/images/radio/love_sad_radio_cover1.jpg";

const Radios: React.FC = ({ ...sectionProps }: IRadiosProps) => {
  return (
    <div {...sectionProps} className={`containerParent`}>
      <div className={`container`}>
        <div className={`${styles.radiosContainer}`}>
      
            <div className={`${styles.radio} card clickableCard`}>
              <img src={chillMusicCoverPath}  alt='chill music radio cover'/>
                <h4 className="headline5 primaryLight p-std">
                  <span className='discIcon'>
                    <i className="bi bi-disc"></i>
                  </span>
                  <span>
                    Radio 27
                  </span>
                </h4>
                <p className="overline white mb-std px-std">
                  #chillmusic #laxvibes
                </p>
              
            </div>
           
            <div className={`${styles.radio} card clickableCard`}>
              <img src={raveMusicCoverPath}  alt='rave music radio cover'/>
                <h4 className="headline5 primaryLight p-std">
                  <span className='discIcon'>
                    <i className="bi bi-disc"></i>
                  </span>
                  <span>
                    Radio 62
                  </span>
                </h4>
                <p className="overline white mb-std px-std">
                  #rave #party 
                </p>
              
            </div>

            <div className={`${styles.radio} card clickableCard`}>
              <img src={sadLoveMusicCoverPath}  alt='sad love music radio cover'/>
                <h4 className="headline5 primaryLight p-std">
                  <span className='discIcon'>
                    <i className="bi bi-disc"></i>
                  </span>
                  <span>
                    Radio 14
                  </span>
                </h4>
                <p className="overline white mb-std px-std">
                  #love #aHeartBreak 
                </p>
              
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default Radios;
