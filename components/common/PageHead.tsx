import Head from 'next/head';

type PageHeadProps = {
  title: string;
};

const PageHead: React.FC<PageHeadProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content="映画の宝さがし" />
    <meta
      name="og:title"
      property="og:title"
      content={title}
    />
    <meta
      name="description"
      content="映画の宝さがし"
    />
    <meta
      property="og:image"
      key="ogImage"
      content={`https://movie-dialoge.vercel.app/ogp.png`}
    />
    <meta
      name="twitter:card"
      key="twitterCard"
      content="summary_large_image"
    />
    <meta
      name="twitter:image"
      key="twitterImage"
      content={`https://movie-dialoge.vercel.app/ogp.png`}
    />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default PageHead;

