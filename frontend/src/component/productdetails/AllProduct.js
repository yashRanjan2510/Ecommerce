import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearerrors,getproduct } from "../../actions/productaction";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";
import Product from "../home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];



function AllProduct() {
    const dispatch=useDispatch();
    const [currentpage, setcurrentpage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading , productscount, error, resultperpage,filteredproductcount } = useSelector((state) => state.products);
     const {keyword} = useParams();
     const alert= useAlert();



    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearerrors);
      }
     dispatch(getproduct(keyword,currentpage,price,category,ratings));
    },[dispatch,keyword,currentpage,price,category,ratings,error,alert])


    
    const setCurrentPageNo = (e) => {
      setcurrentpage(e);
    };

    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
    };

    let count=filteredproductcount;

    
  return (
    <Fragment>
        {loading?<Loader/>: 
        <Fragment>
             <Metadata title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

         {keyword && 
          <div className="filterBox">
          <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}  
                max={5}
              />
            </fieldset>
          </div>
          }
          
          {
            resultperpage<count && (
              <div className="paginationBox">
              <Pagination
                activePage={currentpage}
                itemCountPerPage={resultperpage}
                totalItemsCount={productscount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
          </div>
            )
          }
        </Fragment>
            }
    </Fragment>
  )
}

export default AllProduct