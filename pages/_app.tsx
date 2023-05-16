import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../lib/firebase'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
