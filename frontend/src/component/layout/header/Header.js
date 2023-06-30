import React from 'react'
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import logo from "../../../image/logo.png"
import {BsSearch,BsFillCartDashFill} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"

function Header() {

    let location=useLocation();



useEffect(() => {
}, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
    <div className="container-fluid" style={{backgroundColor:"lightgray"}}>
        <img src={logo} alt="" style={{height:"70px"}}/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active":""}`}  aria-current="page" to="/">Home</Link>
          </li>
          <li>
          <Link className={`nav-link ${location.pathname==="/products"? "active":""}`}  aria-current="page" to="/products">Products</Link>  
          </li>
          <li>
          <Link className={`nav-link ${location.pathname==="/contact"? "active":""}`}  aria-current="page" to="/contact">Contact</Link>
          </li>
          <li>
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`}  aria-current="page" to="/about">About</Link>
          </li>
          
          {/* <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/">Action</Link></li>
              <li><Link className="dropdown-item" href="/">Another action</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" href="/">Something else here</Link></li>
            </ul>
          </li> */}
          
        </ul>
        <form className="d-flex" role="search">
        <Link to="/search"><button className="btn" type="submit">< BsSearch/></button></Link>
        <Link to="/cart"><button className="btn" type="submit">< BsFillCartDashFill/></button></Link>
        <Link to="/login"><button className="btn" type="submit"><CgProfile/></button></Link>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Header