import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./home.css"
import Product from './Product'
import Metadata from '../layout/Metadata'
import { getproduct } from '../../actions/productaction'
import {useDispatch, useSelector} from "react-redux"
import {useAlert }from "react-alert"
import Loader from '../layout/Loader/Loader'



function Home() {
  const alert=useAlert();
  const dispatch=useDispatch(); 
  const {loading,error,products}= useSelector((state) => state.products);

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
     dispatch(getproduct())
  },[dispatch,error,alert])
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
      <Metadata title="Ecommerce"/>
        <div className="banner">
          <p>WELCOME TO ECOMMERCE</p>
          <h1>FIND AMAZING PRODUCT BELOW</h1>
          <a href="#containerrr">
            <button>
              scroll <CgMouse/>
            </button>
          </a>
        </div>
        <h2 className="homeheading">Featred Product</h2>
        
        <div className="containerrr" id='containerrr'>
               {
                products  && products.map(product=>(
                  <Product key={product._id} product={product}/>
                ))
               }
        </div>
    </Fragment>
    )}
    </Fragment>
  )
}

export default Home