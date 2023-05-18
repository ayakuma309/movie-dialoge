import Head from 'next/head'
import Header from './Header'

type MyComponentProps = {
  children: React.ReactNode
  title: string
}
//Layoutコンポーネントの作成。全体のlayout。引数にchildren, title
const Layout: React.FC<MyComponentProps> = ({
  children,
  title = 'セリフから選ぶ映画',
}) => {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center font-mono'>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <section id='header'>
          <Header />
        </section>
      </header>
      <main className='flex max-w-screen-sm flex-1 sm:w-screen sm:max-w-screen-xl'>
        {children}
      </main>
    </div>
  )
}
export default Layout
