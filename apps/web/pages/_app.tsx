import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles.scss'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default CustomApp
