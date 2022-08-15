import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <Navbar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
