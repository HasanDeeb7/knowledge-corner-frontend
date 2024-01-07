import { Link } from "react-router-dom";
import TempBookCard from "../BookCard/tempBookCard";
import {React , useEffect, useState} from "react";
import axios from "axios";
import magnifire from "../../assets/icons/magnifire.jpeg";
import TempBookCard from "../BookCard/tempBookCard";
import AllLibraryBookStyle from "./AllLibraryBook.module.css"


const AllLibraryBook = () => {

    const [menuOpen, setMenuOpen] = useState(true);
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [checkboxes, setCheckboxes] = useState({});
    const [categoriesMap, setCategoriesMap] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const handleClick = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PATH}/api/categories`)
        .then((response) => {
            setCategories(response.data);
            setIsLoading(false);
            const initialCheckboxes ={};
            response.data.forEach((category) => {
                initialCheckboxes[category._id] = false;
            });
            setCheckboxes(initialCheckboxes);
        }).catch((error) => {
            console.error("eroor while fetching Categories: ", error)
        });

        axios.get(`${process.env.REACT_APP_PATH}/api/books`)
        .then((response) => {
            setBooks(response.data);
            setIsLoading(false);

            const authorIds = response.data.map((book) => book.authorId);
            fetchAuthors(authorIds);

            const categoryIds = response.data.map((book) => book.categoryId);
            fetchCategories(categoryIds);
        }).catch((error) => {
            console.error(Error);
        });
    }, []);

    const fetchAuthors = (authorIds) => {
        axios.get(`${process.env.REACT_APP_PATH}/api/authors`,
        {
            params:{authorIds: authorIds},
        })
        .then((res) => {
            const authorMap = {};
            res.data.forEach((author) => {
                authorMap[author._id] = `${author.firstName} ${author.lastName}`;
            })
            setAuthors(authorMap);
            setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    const fetchCategories = (categoryIds) => {
        axios.get(`${process.env.REACT_APP_PATH}/api/categories`,
        {
            params: {categoryId: categoryIds},
        })
        .then((res) => {
            const categMap={};
            res.data.forEach((category) => {
                categMap[category._id] = category.name;
            });
            setCategoriesMap(categMap);
        })
        .catch((err) => console.log(err));
    }
    const handleOnChange = (e) => {
        const categoryId = e.target.value;
        const isChecked = e.target.checked;
    
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [categoryId]: isChecked,
        }));
    
        if (isChecked) {
          setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
        } else {
          setSelectedCategories((prevSelected) =>
            prevSelected.filter((id) => id !== categoryId)
          );
        }
      };

      const filterBooksByCategories = (booksToFilter, selectedCategories) => {
        if (selectedCategories.length === 0) {
          return booksToFilter;
        }
        return booksToFilter.filter((book) =>
          selectedCategories.includes(book.categoryId)
        );
      };
    
      const filteredByCategories = filterBooksByCategories(
        books,
        selectedCategories
      );
      const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
      };
      const filterBooksByName = (booksToFilter, searchInput) => {
        if (searchInput) {
          return booksToFilter.filter((book) =>
            book.title.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
        return booksToFilter;
      };
    
      const filteredBooks = filterBooksByName(filteredByCategories, searchInput);

    return(
        <div>
            <h1 className={AllLibraryBookStyle.titleh1}>
                Library Books Collection
            </h1>
            <form>
                <input
                id="serach"
                className={AllLibraryBookStyle.inputSearch}
                type="text"
                placeholder="Search For a Book"
                value={searchInput}
                onchange={handleSearchInputChange}/>

                <button type="button" className={AllLibraryBookStyle.searchButton}>
                    <img src="" alt="Search img" width="25" height="20" />
                </button>
            </form>
            <div>
                <input
                type="text"
                id="Categories"
                name="Categories"
                value="Search for Categories"
                />

                <button htmlFor="#Categories" onClick={handleClick}>
                    <img src={magnifire} alt="filter"/>
                </button>
            </div>

            <div className={AllLibraryBookStyle.booksContainer}>
                <div 
                className={`${AllLibraryBookStyle.booksCategory}
                 ${menuOpen ? AllLibraryBookStyle.open : ""}`}
                 >
                    <h2>Categories</h2>
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                        {categories.map((category, index) => (
                            <div className={AllLibraryBookStyle.bookCheckbox} 
                            key={index}>
                                <input
                                  type="checkbox"
                                  id={category._id}
                                  name={category.name}
                                  value={category._id}
                                  checked={checkboxes[category._id]|| false}
                                  onchange={handleOnChange}
                                />
                                <label htmlFor={category._id}>{category.name}</label>
                                <br/>
                            </div>
                        ))}
                        </>
                    )}
                </div>
                
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <div className={AllLibraryBookStyle.bookList}
                            key={books.id}>
                                {filteredBooks.map((book) => (
                                    <Link to="/SingleBook" state={{ book: book}}>
                                        <TempBookCard
                                            image={book.image}
                                            author={authors[book.authorId]}
                                            bookTitle={book.title}
                                            rating={book.rating}
                                            category={categoriesMap[book.categoryId]}
                                            />
                                    </Link>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllLibraryBook; 