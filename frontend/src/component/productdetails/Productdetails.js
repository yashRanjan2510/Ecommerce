import React, { Fragment, useEffect, useState } from 'react'
import "./productdetail.css"
import Carousel from "react-material-ui-carousel"
import { useSelector,useDispatch  } from 'react-redux'
import { clearerrors, getproductdetails } from '../../actions/productaction'
import {  useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader'
import ReactStars from "react-rating-stars-component" 
import Reviewcard from './Reviewcard'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata'
import { addItemsToCart } from '../../actions/cartaction'

const Productdetails = () => {
 const dispatch = useDispatch();
 const alert=useAlert();
 const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );


  

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  
  useEffect(()=>{
    if(error){
       alert.error(error)
       dispatch(clearerrors())
    }

     dispatch(getproductdetails(id))
  },[dispatch,id,error,alert])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
        <Metadata title={`${product.name} -- ECOMMERCE`} />
        <div className="ProductDetails">
           <div>
            {/* <Carousel> */}
                {
                    product.images &&
                    product.images.map((item,i)=>(
                    <img  className='CarouselImage' src={item.url} 
                    key={i} alt={`${i}Slide`} />
                  ))
                }
             {/* </Carousel> */}
           </div>
           <div >
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
              <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfreviews} Reviews)
                </span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity} >-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity} >+</button>
                    </div>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">
                Submit Review
              </button>
        </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        {
            product.reviews && product.reviews[0]?(
                <div className="reviews">
                    {
                        product.reviews.map((review)=><Reviewcard review={review}/>)
                    }
                </div>
            ):(
                <p className='noReviews'>No Reviews Yet</p>
            )
        }
    </Fragment>
     )}
     </Fragment>
  )
}

export default Productdetails