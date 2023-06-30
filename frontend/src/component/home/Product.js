import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"


function Product({product}) {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className='productcard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}  />
        <p>{product.name}</p>
        <div>
            <ReactStars classNames="star" { ...options}/> 
        </div>
        <span className='reviews'>{product.numOfreviews} Reviews</span>
        <span className='productprice'>₹{product.price}</span>
    </Link>
  )
}

export default Product