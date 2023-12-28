import React from 'react'
import Content from '../../components/Contents/Contents'
import HeroSection from '../../components/HeroSection/HeroSection'
import { Helmet } from "react-helmet";
import books from '../../assets/icons/books-stack-of-three 2.svg'
function Landing() {
    
    return (
        <div>
            <Helmet>
        <meta charSet="utf-8" />
        <title>Sapiens</title>
        <meta name="description" content="landing page" />
        <link rel="icon" href={books} />
      </Helmet>
            <HeroSection/>
            <Content/>
        </div>
    )
}

export default Landing
