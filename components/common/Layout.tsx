import Header from './Header'
import Footer  from './Footer';

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
