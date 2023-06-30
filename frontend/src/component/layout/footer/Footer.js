import React from 'react'
// import playstore from "../../image/playstore.png"
import playstore from "../../../image/playstore.png"
import appstore from "../../../image/Appstore.png"
import "./footer.css"


function Footer() {
  return (
    <footer id="footer">
        <div className="leftfooter"> 
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
        </div>
        <div className="midfooter">
            <h4>ECOMMERCE</h4>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; YashRanjan</p>
        </div>
        <div className="rightfooter">
            <h4>Follow Us</h4>
            <a href="https://getbootstrap.com/docs/5.0/components/navbar/">Instagram</a>
            <a href="https://getbootstrap.com/docs/5.0/components/navbar/">Facebook</a>
            <a href="https://getbootstrap.com/docs/5.0/components/navbar/">Linkdin</a>
            </div> 
    </footer>
  )
}

export default Footer