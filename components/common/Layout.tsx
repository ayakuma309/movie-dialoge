import Head from 'next/head'
import Header from './Header'
import Footer  from './Footer';

type MyComponentProps = {
  children: React.ReactNode
  title: string
}
//Layoutコンポーネントの作成。全体のlayout。引数にchildren, title
const Layout: React.FC<MyComponentProps> = ({
  children,
  title = 'Dialogue Cinema',
}) => {
  return (
    <>
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
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
        <header>
          <section id='header'>
            <Header />
          </section>
        </header>
        <main className='flex max-w-screen-sm flex-1 sm:w-screen sm:max-w-screen-xl'>
          <div className="container mx-auto flex flex-col items-center sm:max-w-7xl">
            <div className="mt-24">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  )
}
export default Layout
