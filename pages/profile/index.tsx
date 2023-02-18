import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import Profile from '../../components/profile/Profile';
import { NextPageWithLayout } from '../page';

const ProfilePage: NextPageWithLayout = () => {
  return (
    
    <div  className={`containerParent`}>
      <div className={`container centerInContainer py-md`}>
      <Profile />
    </div>
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayoutForPage = (page) => {
  return <PrimaryLayout >{page}</PrimaryLayout>;
};