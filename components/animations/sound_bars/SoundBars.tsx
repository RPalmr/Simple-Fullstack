import styles from "./SoundBars.module.css";

export interface ISoundBarsProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const SoundBars: React.FC = ({ ...divProps }: ISoundBarsProps) => {
  return (
    <div {...divProps} className={`${styles.soundBars}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default SoundBars;
