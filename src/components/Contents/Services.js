import contentsStyle from "./contents.module.css";
import image5 from "../../assets/icons/satisfaction (4).png";
import image6 from "../../assets/icons/good (1).png";
import image7 from "../../assets/icons/online-library (1).png";
import image8 from "../../assets/icons/digital-library.png";
import image9 from "../../assets/icons/key-person.png";
import image10 from "../../assets/icons/library.png";
function Services() {
  return (
    <div className={contentsStyle.borderComponent}>
      <section className={contentsStyle.singleBorder}>
        <img src={image5} alt="satisfation" />
        <h3>User Ratings and reviews</h3>
        <p>
          Discover what other users are saying about our services and share your
          own experiences.
        </p>
      </section>

      <section className={contentsStyle.singleBorder}>
        <img src={image6} alt="social-media" />
        <h3>User Recommendations</h3>
        <p>
          Explore personalized recommendations from our community to enhance
          your experience.
        </p>
      </section>

      <section className={contentsStyle.singleBorder}>
        <img src={image7} alt="online-library" />
        <h3>Extensive Digital Library</h3>
        <p>
          Gain access to a vast online library with a wealth of digital
          resources at your fingertips.
        </p>
      </section>

      <section className={contentsStyle.singleBorder}>
        <img src={image8} alt="book-2" />
        <h3>Educational Resources</h3>
        <p>
          Access a wide range of educational materials and tools to support your
          learning journey.
        </p>
      </section>

      <section className={contentsStyle.singleBorder}>
        <img src={image9} alt="authorization" />
        <h3>Author Profiles</h3>
        <p>
          Dive into the profiles of talented authors and get to know the
          creative minds behind your favorite books.
        </p>
      </section>

      <section className={contentsStyle.singleBorder}>
        <img src={image10} alt="check-list" />
        <h3>Reading Lists</h3>
        <p>
          Create and explore reading lists to help you organize and discover new
          books tailored to your interests.
        </p>
      </section>
    </div>
  );
}

export default Services;
