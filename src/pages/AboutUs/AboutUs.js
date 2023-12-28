import React from "react";
import aboutUsStyle from "./AboutUs.module.css";
import firstImage from "../../assets/images/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg";
import secondImage from "../../assets/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg";
import imgHeaderAbout from "../../assets/images/book-illustrations-removebg-preview.png";
import thirdImage from "../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";
import { Helmet } from "react-helmet";
import about from '../../assets/icons/information-button.png'

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
          Sapiens we are a
          book-loving community with a unique story. We believe in the
          transformative power of books. Our passion for reading led us to
          create a place where everyone can access a wide range of books. But we
          go beyond that – we empower new authors to share their stories with
          the world. Sapiens is now a digital library, a treasure trove of
          stories. For authors, Sapiens is a launchpad for their dreams.
        </p>

        <img src={imgHeaderAbout} alt="sapiens" />
      </div>

      <div className={aboutUsStyle.firstComponent}>
        <img src={firstImage} alt="Library" />
        <div>
          <h3 className={aboutUsStyle.vision}>Our Vision</h3>
          <p>
          At Sapiens, we
          love books and sharing knowledge. Our team of librarians and staff
          carefully selects all sorts of books for you to read, from old
          classics to popular new ones. We think libraries are great because
          they're not just places with books. They're also where you can learn
          new things and get inspired. If you need a source to read, want to
          discover new stories, or just explore interesting stuff, Sapiens is
          here for you. Let's read and learn together.</p></div>
      </div>

      <div className={aboutUsStyle.secondComponent}>
        <img src={secondImage} alt="Library" />
          <div>
          <h3 className={aboutUsStyle.vision}>
            Our Commitment to Knowledge and Community
          </h3>
          <p>
          At Sapiens , our mission is to empower our community with knowledge
          and inspire a lifelong love of learning. We are dedicated to providing
          a welcoming and inclusive space where people of all ages and
          backgrounds can access a world of information, literature, and
          cultural enrichment. Our goal is to foster intellectual curiosity,
          support education, and promote literacy in our community. We believe
          that libraries play a vital role in connecting people, and we are
          committed to offering a diverse range of resources and services that
          enrich lives, spark creativity, and promote positive change. Whether
          you're seeking an escape through the pages of a great novel or need
          assistance with research, our library is here to serve your needs.
          Welcome to a place where exploration and discovery are encouraged, and
          the pursuit of knowledge knows no bounds.
        </p>
        </div>
      </div>
      <div className={aboutUsStyle.firstComponent}>
        <img src={thirdImage} alt="Library" className={aboutUsStyle.lastimg}/>
        <div>
        <h3 className={aboutUsStyle.vision}>
            Exploring the Sapiens Community
          </h3>
        <p >
          At Sapiens , we take pride in our thriving community of readers and
          authors. With millions of visitors each month, our website has become
          a hub for book enthusiasts from around the globe. We're more than just
          an online library; we're a vibrant ecosystem of literary exploration.
          Join the millions of fellow readers who have made Sapiens their
          destination for discovering new stories, authors, and genres. Whether
          you're looking for bestsellers or hidden gems, our extensive
          collection has something for everyone. Let your reading journey take
          flight with us. The world of literature is vast and endlessly
          fascinating, and Sapiens is your passport to explore it.
        </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
