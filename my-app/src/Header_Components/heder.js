import React, { useState,useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { decode } from "../decodeJWT";
import axios from "axios";

const Header = () => {
  const [userData,setUserData]=useState([]);
  const user_id=(decode(localStorage.getItem("active"))).user_id;
  console.log(user_id);
  const isFetchedRef=useRef(false)
  useEffect(()=>{
    if(isFetchedRef.current)return;
    isFetchedRef.current=true;
    const url1="http://127.0.0.1:8000/api/users/get_user/?id="+user_id;
    
   Promise.all( 
    [
      axios.get(url1)
    ])
    .then(([userResponse])=>{
        setUserData(userResponse.data);
    })
    .catch((error)=>{
        console.log(error.message);
      })

},[user_id]);
  
  return (
    <div>
    <header>
      <Link to="/" className="logo">
        <img src="./Assets/NovelNestLogo.png"/>
      </Link>
      <SearchBar />
      <ProfileDropdown />
    </header>
    <Navbar />
    </div>
  );
};

export default Header;
