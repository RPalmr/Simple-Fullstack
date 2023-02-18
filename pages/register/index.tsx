import NoHeaderNoFooterLayout from '../../components/layouts/NoHeaderNoFooterLayout';
import Register from '../../components/register/Register';
import { NextPageWithLayout } from '../page';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
    <Register />
    </>
  );
};

export default RegisterPage;

RegisterPage.getLayoutForPage = (page) => {
  return <NoHeaderNoFooterLayout>{page}</NoHeaderNoFooterLayout>;
};