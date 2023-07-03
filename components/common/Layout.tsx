import Header from './Header'
import Footer  from './Footer';
import Head from 'next/head';

type MyComponentProps = {
  children: React.ReactNode
  title: string
}
//Layoutコンポーネントの作成。全体のlayout。引数にchildren, title
const Layout: React.FC<MyComponentProps> = ({
  children,
  title = 'セリフの映画館',
}) => {
  return (
    <>
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
        <Head>
          <title>{title}</title>
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
