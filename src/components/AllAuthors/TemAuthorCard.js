import AllBooksStyle from "../../components/AllBooks/AllBooks.module.css";

function TemAuthorCard(props) {
  const { authorName, image, rating } = props;
  // console.log(authorId)
  return (
    <figure className={AllBooksStyle.figure}>
      <img
        src={`${process.env.REACT_APP_PATH}/images/${image}`}
        alt="Book cover"
        className={AllBooksStyle.image}
      />

      <figcaption className={AllBooksStyle.figcaption}>
        <p> {authorName}</p>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${rating >= star ? AllBooksStyle.filled : ""}`}
            >
              &#9733;
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
export default TemAuthorCard;
