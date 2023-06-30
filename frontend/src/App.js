import './App.css';
import Header from '../src/component/layout/header/Header';
import {BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
import React, { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import Footer from "../src/component/layout/footer/Footer"
import Home from "../src/component/home/Home"
import Productdetails from './component/productdetails/Productdetails';
import AllProduct from './component/productdetails/AllProduct';
import Search from './component/productdetails/Search';
import LoginSignup from './component/user/LoginSignup';
import Profile from './component/user/Profile';
import store from "./store"
import { loadUser } from './actions/useraction';
import Useroption from './component/layout/header/Useroption';
import { useSelector } from 'react-redux';
import Protectedroute from './component/route/Protectedroute';
import Updateprofile from './component/user/Updateprofile';
import Updatepassword from './component/user/Updatepassword';
import Forgotpassword from './component/user/Forgotpassword';
import Resetpassword from './component/user/Resetpassword';
import Cart from './component/cart/Cart';

function App() {

  const {isauthenticated,user} = useSelector(state=>state.user)
   useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
   },[])
  return (  

      <Router>
      <Header/>
      {isauthenticated && <Useroption user={user}/>}
       <div className="containerr">
       <Routes>
          <Route exact path="/"element={ <Home/>}/>
          <Route exact path="/product/:id"element={ <Productdetails/>}/>
          <Route exact path="/products"element={ <AllProduct/>}/>
          <Route  path="/products/:keyword"element={ <AllProduct/>}/>
          <Route exact path="/search"element={ <Search/>}/>
          <Route exact path="/login"element={ <LoginSignup/>}/>
          <Route exact path="/password/forgot"element={ <Forgotpassword/>}/>          
          <Route exact path="/password/reset/:token"element={ <Resetpassword/>}/> 
          <Route exact path="/cart" element={ <Cart/>} />
          <Route element={<Protectedroute isauthenticated={isauthenticated} />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<Updateprofile />} />
            <Route path="/password/update" element={<Updatepassword />} />
            
          </Route>
       </Routes>
       </div>
       <Footer/>
       </Router>
     
      
   
  );
}

export default App;
