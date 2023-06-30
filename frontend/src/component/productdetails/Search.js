import React, { useState } from 'react'
import { Fragment } from 'react'
import Metadata from '../layout/Metadata'
import { useNavigate } from 'react-router-dom'
import "./Search.css"

function Search({history}) {
    const [keyword, setKeyword] = useState("");
    const nevigate=useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
         nevigate(`/products/${keyword}`);
        } else {
          nevigate("/products");
        }
      };
  return (
    <Fragment>
      <Metadata title="Search A Product -- ECOMMERCE" />
      <form className="searchBox"  onSubmit={searchSubmitHandler} >
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
           />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search