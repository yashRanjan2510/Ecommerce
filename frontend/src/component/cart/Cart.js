import React, { Fragment } from 'react'
import "./cart.css"
import Cartitemcard from './Cartitemcard'
import { useSelector } from 'react-redux';

const Cart = () => {
    // const { cartItems } = useSelector((state) => state.cart);
    // console.log(cartItems)
    const item={
        product:'product123',
        price:200,
        name:"uyqvkbX",
        quantity:7,
        image:"https://images.unsplash.com/photo-1584397596438-a4ded32a7c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFnbm9saWElMjBmbG93ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    }
  return (
    <Fragment>
        <div className='cartPage'>
        <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

          <div className="cartContainer" >
                  <Cartitemcard item={item}  />
                  <div className="cartInput">
                    <button>-</button>
                    <input value={item.quantity} readOnly type="number" />
                    <button>+</button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>   

                <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{600}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button >Check Out</button>
              </div>
            </div>           
        </div>
    </Fragment>
  )
}

export default Cart