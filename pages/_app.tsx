import Script from "next/script";
import * as gtag from "../lib/gtag";

import { useRouter } from "next/router";
import { useEffect } from "react";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../lib/firebase'

import { RecoilRoot } from "recoil";
import { useAuth } from "../lib/auth";

const router = useRouter();

useEffect(() => {
  const handleRouterChange = (url: any) => {
    gtag.pageview(url);
  };

  router.events.on('routeChangeComplete', handleRouterChange);

  return () => {
    router.events.off('routeChangeComplete', handleRouterChange);
  };
}, [router.events]);


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
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_MEASUREMENT_ID}');
              `,
            }}
          />
          <Component {...pageProps} />
        </>
      </Auth>
    </RecoilRoot>
  );
}

export default App;
