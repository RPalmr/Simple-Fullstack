import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import PrivacyPolicyComponent from '../../components/privacy_policy_component/PrivacyPolicyComponent';
import { NextPageWithLayout } from '../page';

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <PrivacyPolicyComponent></PrivacyPolicyComponent>
  );
};

export default PrivacyPolicy;

PrivacyPolicy.getLayoutForPage = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};