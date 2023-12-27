import style from "./LibraryCard.module.css"
import BookCover from "../../assets/images/bookcover.jpg"


const LibraryCard = ({library}) => {

    const size= {
        width:'200px',
        height:'250px'
    };


return(
    
        <>
          <figure className={style.figure} >
          <img src={""} alt="Book cover" className={style.image} style={size}/>
            <figcaption className={style.figcaption}>
              <p>
                <span>library.name</span>
              </p>
            </figcaption>
          </figure>
        </>
      );
    
    
}
export default LibraryCard;