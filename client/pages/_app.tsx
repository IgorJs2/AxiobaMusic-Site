import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {FC} from "react";
import {wrapper} from "../store";

const WrappedApp : FC<AppProps> = ({ Component, pageProps }) =>{
  return <>
    <Head>
      <title>AxiobaMusic</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default wrapper.withRedux(WrappedApp)
