import aboutUsStyle from "./AboutUs.module.css";
import firstImage from "../../assets/images/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg";

function FirstComponent() {
  return (
    <div className={aboutUsStyle.firstComponent}>
      <img src={firstImage} alt="Library" />
      <div>
        <h3 className={aboutUsStyle.vision}>Our Vision</h3>
        <p>
          At Sapiens, we love books and sharing knowledge. Our team of
          librarians and staff carefully selects all sorts of books for you to
          read, from old classics to popular new ones. We think libraries are
          great because they're not just places with books. They're also where
          you can learn new things and get inspired. If you need a source to
          read, want to discover new stories, or just explore interesting stuff,
          Sapiens is here for you. Let's read and learn together.
        </p>
      </div>
    </div>
  );
}

export default FirstComponent;
