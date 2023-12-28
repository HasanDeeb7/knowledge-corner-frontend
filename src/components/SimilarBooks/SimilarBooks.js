import style from "./SimilarBooks.module.css";

function SimilarBooks({ image, bookTitle }) {
  return (
    <div>
      <img className={style.similarBookImage} src={image} alt={bookTitle} />
    </div>
  );
}

export default SimilarBooks;
