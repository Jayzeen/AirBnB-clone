import "../styles/globals.css";
import "../components/Navbar/navbar.css";
import NavBar from "../components/Navbar/navbar";
import "../components/Slider/reviewSlider.css";
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <link rel="icon" size="32x32" href="./airbnb-logo.png"/>
        <title>🏡AirBnB Clone🏡</title>
        <meta name="Jayzeen" content="AirBnB Clone" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp