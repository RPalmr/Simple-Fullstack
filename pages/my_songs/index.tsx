import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import MySongs from '../../components/my_songs/MySongs';
import { NextPageWithLayout } from '../page';

const ProfilePage: NextPageWithLayout = () => {
  return (
    
    <div  className={`containerParent`}>
      <div className={`container py-md`}>
      <MySongs />
    </div>
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayoutForPage = (page) => {
  return <PrimaryLayout >{page}</PrimaryLayout>;
};