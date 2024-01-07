import React, { Suspense, lazy } from "react";
import aboutUsStyle from "./AboutUs.module.css";
import firstImage from "../../assets/images/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg";
import imgHeaderAbout from "../../assets/images/book-illustrations-removebg-preview.png";
import { Helmet } from "react-helmet";
import about from "../../assets/icons/information-button.png";
// import FirstComponent from "./FirstComponent";
// import SecondComponent from "./SecondComponent";
// import ThirdComponent from "./ThirdComponent";
const FirstComponent = lazy(() => import("./FirstComponent"));
const SecondComponent = lazy(() => import("./SecondComponent"));
const ThirdComponent = lazy(() => import("./ThirdComponent"));

function AboutUs() {
  return (
    <div className={aboutUsStyle.libraryContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <meta name="description" content="About us page" />
        <link rel="icon" href={about} />
      </Helmet>
      <h1 className={aboutUsStyle.aboutustitle}>About Us</h1>

      <div className={aboutUsStyle.header}>
        <p>
          Sapiens we are a book-loving community with a unique story. We believe
          in the transformative power of books. Our passion for reading led us
          to create a place where everyone can access a wide range of books. But
          we go beyond that – we empower new authors to share their stories with
          the world. Sapiens is now a digital library, a treasure trove of
          stories. For authors, Sapiens is a launchpad for their dreams.
        </p>

        <img src={imgHeaderAbout} alt="sapiens" />
      </div>
      <Suspense fallback="Loading...">
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </Suspense>
    </div>
  );
}

export default AboutUs;
