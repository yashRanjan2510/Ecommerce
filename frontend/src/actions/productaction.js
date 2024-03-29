import axios from "axios";
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST ,CLEAR_ERRORS
,  PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_SUCCESS,
} from "../constants/productconstants"

export  const getproduct= (keyword="",currentpage = 1,price=[0, 25000],category,ratings=0) => async (dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST,
        })
        let link=`/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
          }
        const {data}=await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch(
            {type:ALL_PRODUCT_FAIL,
             payload:error.response.data.message
            }
        )
    }
} 

export  const getproductdetails=(id)=> async (dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST,
        })
        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch(
            {type:PRODUCT_DETAILS_FAIL,
             payload:error.response.data.message}
        )
    }
}

// cleaning errors
export  const clearerrors=()=> async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}