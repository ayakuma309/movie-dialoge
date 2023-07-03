import { NextPage } from "next";
import TopContents from "../components/topPage/TopContents";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>セリフの映画館</title>
        <meta property="description"  content="映画の宝さがし" />
        <meta property="og:title" content="Dialogue cinema"/>
        <meta property="og:description" content="映画の宝さがし" />
        <meta property="og:image" content={`https://movie-dialoge.vercel.app/ogp.png`}/>
        <meta property="og:url" content={`https://movie-dialoge.vercel.app`}/>
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:image" content={`https://movie-dialoge.vercel.app/ogp.png`}/>
        <meta property="twitter:title" content="Dialogue cinema"/>
        <meta property="twitter:description" content="映画の宝さがし"/>
        <meta property="twitter:site" content="@movie-dialogue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container flex flex-col items-center sm:max-w-7xl'>
        <div>
          <TopContents />
        </div>
      </div>
    </div>
  );
}
export default Home;
