import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import './styles.scss'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
