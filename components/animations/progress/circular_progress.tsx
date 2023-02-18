export interface ICircleProgressProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const CircleProgress: React.FC = ({ ...divProps }: ICircleProgressProps) => {
  return (
    <span {...divProps} className="loaderContainer">
      <span className="progress progressSm"></span>
    </span>
  );
};

export default CircleProgress;
