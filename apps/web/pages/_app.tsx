import { UserContext, UserProvider } from '@tbot/shared'
import { IUser } from '@tbot/types'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './styles.scss'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <UserContext.Provider value={null}>
        <Component {...pageProps} />
      </UserContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default CustomApp

export const CustomAppWrapper = ({ children, init }: { children: ReactElement; init: IUser }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider user={init}>{children}</UserProvider>
    </QueryClientProvider>
  )
}
