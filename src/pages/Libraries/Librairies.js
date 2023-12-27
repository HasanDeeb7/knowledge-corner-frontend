import React, { useEffect, useState } from 'react'
import LibraryCard from '../../components/LibraryCard/LibraryCard'
import style from './Librairies.module.css'
import filter from "axios";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import magnifire from '../../assets/icons/magnifire.jpeg'

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  // const [serchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get(`${process.env.REACT_APP_PATH}/api/libraries`)
        // console.log('library Data: ',response.data);
        setLibraries(response.data);
        setIsLoading(false);
      }catch(error){
        console.error('error fetchin the data:', error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
    <div>
      <h1 className={style.titleh1}>Library Collection</h1>
      <form className={style.librarySearch}>
        <input
          id="search"
          className={style.inputSearch}
          type="text"
          placeholder="Search For Library"
          // value={searchInput}
          // onChange={handleSearchInputChange}
        />
        <button type="button" className={style.searchButton}>
          <img src={magnifire} alt="search img" width="25" height="20" />
        </button>
      </form>
      </div>
    <div className={style.mainCards}>
      {isLoading ? (
        <p>Loading....</p>
      ):(
        libraries.map((Library) => (
          <LibraryCard key={Library.id} library={Library} />
        ))
      )}
     
      <footer/>
      </div>
    </>
  )
}

export default Libraries;
