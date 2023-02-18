import styles from './PrivacyPolicyComponent.module.css';

export interface IHeader extends React.ComponentPropsWithoutRef<'div'> {}

const PrivacyPolicyComponent: React.FC = ({ ...divProps }) => {
  return (
    <div {...divProps} className={`${styles.container} primary`}>
      <p className={`headline4`}>PRIVACY POLICY</p>
    </div>
  );
};

export default PrivacyPolicyComponent;
