import aboutUsStyle from "./AboutUs.module.css";
import thirdImage from "../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";

function ThirdComponent() {
  return (
    <div className={aboutUsStyle.firstComponent}>
      <img src={thirdImage} alt="Library" className={aboutUsStyle.lastimg} />
      <div>
        <h3 className={aboutUsStyle.vision}>Exploring the Sapiens Community</h3>
        <p>
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
  );
}

export default ThirdComponent;
