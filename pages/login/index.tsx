import NoHeaderNoFooterLayout from '../../components/layouts/NoHeaderNoFooterLayout';
import Login from '../../components/login/Login';
import { NextPageWithLayout } from '../page';

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
    <Login />
    </>
  );
};

export default LoginPage;

LoginPage.getLayoutForPage = (page) => {
  return <NoHeaderNoFooterLayout>{page}</NoHeaderNoFooterLayout>;
};