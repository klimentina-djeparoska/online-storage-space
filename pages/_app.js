import '../styles/globals.css';
import React from 'react';
import config from '../config';
import Head from 'next/head';
import Amplify from '@aws-amplify/core';
import {AuthProvider} from "../contexts/auth";
import wrapper from '../store';
import PropTypes from 'prop-types';
import Menu from "../components/menu";
import Footer from "../components/footer";

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.USER_POOL_CLIENT_ID,
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Online Storage Space</title>
          <link href="/icon-ads-512x512.png" rel="icon" type="image/png" sizes="512x512" />
          <link href="/icon-ads-192x192.png" rel="icon" type="image/png" sizes="192x192" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-ads-152x152.png"/>
          <link rel="manifest" href="/manifest-ads.webmanifest" />
          <meta name="theme-color" content="#45D19E" />
        </Head>
        <AuthProvider>
          <Menu {...pageProps}/>
          <Component { ...pageProps } />
          <Footer {...pageProps}/>
        </AuthProvider>
      </>
  )
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
