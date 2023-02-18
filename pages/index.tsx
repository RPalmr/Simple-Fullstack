import PrimaryLayout from '../components/layouts/PrimaryLayout';
import PlayingRadio from '../components/playing_radio/PlayingRadio';
import Radios from '../components/radios/Radios';
import { NextPageWithLayout } from './page';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
    <PlayingRadio />
    <Radios />
    </>
  );
};

export default HomePage;

HomePage.getLayoutForPage = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};