import aboutUsStyle from "./AboutUs.module.css";
import secondImage from "../../assets/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg";

function SecondComponent() {
  return (
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
  );
}

export default SecondComponent;
