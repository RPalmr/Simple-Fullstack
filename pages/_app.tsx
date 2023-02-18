import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from './page';
import { AuthContextProvider } from '../context/AuthContext';
import MetaHead from '../components/metahead/MetaHead';
import { Toaster } from 'react-hot-toast';

interface AppPropsWithLayout extends AppProps{
  Component : NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  //use layout defined by page if available

  const getLayout = Component.getLayoutForPage || ((page) => page); 
  
  return <><MetaHead/>
  <AuthContextProvider>
    {getLayout(<Component {...pageProps} />)}
    <Toaster />
  </AuthContextProvider></>;
}

export default MyApp;
