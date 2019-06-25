import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
            <title>Mediasmart - Team 👨🏻‍💻</title>
            <link rel='shortcut icon' href='/static/favicon.png' />
            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700|Montserrat:700|Merriweather:300' rel='stylesheet' type='text/css'></link>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}