import React from 'react'
import profilePng from "../../image/Profile.png"
import ReactStars from "react-rating-stars-component" 
import "./productdetail.css"

const Reviewcard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default Reviewcard