import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../../components/HeroSection/HeroSection";
import { lazy } from "react";
import books from '../../assets/icons/books-stack-of-three 2.svg'

const Content = lazy(() => import("../../components/Contents/Contents"));

function Landing() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sapiens</title>
        <meta name="description" content="landing page" />
        <link rel="icon" href={books} />
      </Helmet>
      <HeroSection />
      <Suspense fallback="Loading...">
        <Content />
      </Suspense>
    </div>
  );
}

export default Landing;
