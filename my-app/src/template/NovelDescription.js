import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decode } from "../decodeJWT";
import { Del_bookmark } from "../Generic_API/Del_bookmark";
import { Create_bookmark } from "../Generic_API/Create_bookmark";
const NovelDescription = ({  image, title, description, status, rating }) => {
  const [isActive, setIsActive] = useState(false);
  const[novelBook,setnovelBook]=useState([]);
    const handleClick = () => {
        
       setIsActive((prevState) => !prevState); // Toggle the active state
       if(isActive){Del_bookmark(novelBook[0].bookmark_id);}
       else {Create_bookmark(user_id,novel_id);}
       
  };
 
const {id}=useParams();// fetching novel_id
const novel_id=id;
const user_id=(decode(localStorage.getItem("active"))).user_id;
  useEffect(() => {
        
            const url = "http://127.0.0.1:8000/api/bookmarks/get_bookmark/?id="+user_id+"&novel_id="+novel_id;
            axios
            .get(url)
            .then((response)=>{
                setnovelBook(response.data);
                if(response.status===200){
                    console.log("Hoise")
                    setIsActive(true);
                }else if(response.status===400){
                    console.log("Hoinai")
                    setIsActive(false);
                }else{
                    console.log("Bal  hoise");
                }
            })
            .catch((error) => {
                setIsActive(false);
              });
    },[novel_id, user_id]);


    





    

  return (
    <div>
      <div className="novel_container">
        <div className="novel-header">
          <img src={image} alt="Cover Image" />
          <div className="novel-info">
            <h1>{title}</h1>
            <div className="rating">
              <span className="rating-count">Rating: {rating}</span>
            </div>
            <p className="status">
              Status: <span>{status === 0 ? "Ongoing" : "Completed"}</span>
            </p>
            <p className="author">
              Author: <span>Author Name</span>
            </p>
            <button
              className={"bookmarkBtn" + (isActive ? " active" : "")}
              onClick={handleClick} // Toggle state on click
            >
              <span className="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                  <path
                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                  ></path>
                </svg>
              </span>
              <p className="text">Save</p>
            </button>
          </div>
        </div>
        <div className="novel-description">
          <h2>Synopsis</h2>
          <p>{description} </p>
        </div>
      </div>
    </div>
  );
};

export default NovelDescription;
