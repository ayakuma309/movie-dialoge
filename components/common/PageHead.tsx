import Head from 'next/head';

type PageHeadProps = {
  title: string;
};

const PageHead: React.FC<PageHeadProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="映画の宝さがし" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content="映画の宝さがし" />
    <meta property="og:image" key="ogImage" content="https://movie-dialoge.vercel.app/ogp.png" />
    <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
    <meta name="twitter:image" key="twitterImage" content="https://movie-dialoge.vercel.app/ogp.png" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default PageHead;

