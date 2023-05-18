import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../lib/firebase'

import { RecoilRoot } from "recoil";
import { useAuth } from "../lib/auth";

type Props = {
  children: JSX.Element;
};

//useAuth() は <RecoilRoot> の子孫コンポーネントでしか使用できないので
//<Auth> コンポーネントを作成し, その中で使用しています
const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  );
}

export default App;
