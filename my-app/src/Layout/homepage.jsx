import React, { useEffect, useState } from "react";
import Card from "../template/card";
import Slider from "../template/Slider";
import axios from "axios";
import { decode } from "../decodeJWT";
const Homepage=()=>{

  const user_id=(decode(localStorage.getItem("active"))).user_id;
    const novels = [
        { image: "./Assets/img1.jpeg", title: "Jujutsu Kaisen 0", description: "Action, Slice of Life", genres: ["#action", "#slice of life"] },
        { image: "./Assets/img2.jpg", title: "Your Name", description: "Adventure, Slice of Life", genres: ["#adventure", "#slice of life"] },
        { image: "https://i.postimg.cc/76yy4KmD/img5.png", title: "Path Of Peace", description: "Slice of Life", genres: ["#slice of life"] },
      ];
const [actionNovels,setActionNovels]=useState([]);
const [adventureNovels,setadventureNovels]=useState([]);
const [sliceoflifeNovels,setsliceoflifeNovels]=useState([]);
const[isekaiNovels,setIsekaifeNovels]=useState([]);
const[fantasyNovels,setFantasyNovels]=useState([]);
const[novelHistory,setnovelHistory]=useState([]);
const[userHistory,setuserHistory]=useState([]);
const [loading, setLoading] = useState(true);

useEffect(()=>{
    Promise.all([
      axios.get("http://127.0.0.1:8000/api/novels/novel_action/"),
      axios.get("http://127.0.0.1:8000/api/novels/novel_slice_of_life/"),
      axios.get("http://127.0.0.1:8000/api/novels/novel_adventure/"),
      axios.get("http://127.0.0.1:8000/api/novels/novel_isekai/"),
      axios.get("http://127.0.0.1:8000/api/novels/novel_fantasy/"),
      axios.get("http://127.0.0.1:8000/api/history/get_history/?id="+user_id)
    ])

    .then(([actionResponse,sliceoflifeResponse,
      adventureResponse, isekaiResponse, fantasyResponse,userHistoryResponse,
    ])=>{
        setActionNovels(actionResponse.data);
        setsliceoflifeNovels(sliceoflifeResponse.data);
        setadventureNovels(adventureResponse.data);
        setIsekaifeNovels(isekaiResponse.data);
        setFantasyNovels(fantasyResponse.data);
        setuserHistory(userHistoryResponse.data);
        setLoading(false);
    })
    .catch((error)=>{
      alert(error.message);
      setLoading(false);
    })

},[])

useEffect(() => {
  if (userHistory.length === 0) {
      console.log("No bookmarks found, skipping novel details fetch."); // Debug log for no bookmarks
      return;
  }

  console.log("Fetching details for history:", novelHistory); // Debug log for bookmarks state

  const novel_ids = userHistory.map((novel) => novel.novel_id);
  const novelRequests = novel_ids.map((novel_id) =>
      axios.get("http://127.0.0.1:8000/api/novels/novel/?novel_id=" + novel_id)
  );

  Promise.all(novelRequests)
      .then((responses) => {
          console.log("Novel Details API Responses:", responses); // Debug log for novel API responses
          const details = responses.map((response) => response.data);
          console.log("Extracted Novel Details:", details); // Debug log for extracted data
          setnovelHistory(details);
      })
      .catch((error) => {
          console.error("Error fetching novel details:", error.message); // Debug log for errors
      });
}, [userHistory]);




if (loading) {
  return (
    <div class="spinner-box">
      <div class="circle-border">
        <div class="circle-core"></div>
      </div>  
    </div>
    );  
}



      return (
        <div>
          <Slider />
          <div className="field">
            <div className="heading">
              <h1><a href="#">Action</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
              {actionNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "#adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="field">
            <div className="heading">
              <h1><a href="#">Slice of Life</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {sliceoflifeNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <div className="heading">
              <h1><a href="#">Adventure</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {adventureNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="field">
            <div className="heading">
              <h1><a href="#">Isekai</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {isekaiNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <div className="heading">
              <h1><a href="#">Fantasy</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
                {fantasyNovels.map((novel) => (
                  <Card 
                  key={novel.novel_id}
                  id={novel.novel_id}
                  image={novel.novel_img_link}
                  title={novel.novel_name}
                  description={novel.intro}
                  genres={[novel.action ? "#action":"", novel.adventure? "adventure": "",novel.isekai ? "#isekai" : "", novel.fantasy ? "#fantasy" : "", novel.slice_of_life ? "#slice_of_life" : ""].filter(Boolean)} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="field">
  <div className="heading">
    <h1><a href="#">Continue Reading</a></h1>
  </div>
  <div className="container">
    <div className="card__container">
      {novelHistory.length > 0 ? (
        novelHistory.map((novel, index) => (
          <Card
            key={(novel[0]?.novel_id || "") + "-" + index}
            id={novel[0]?.novel_id}
            image={novel[0]?.novel_img_link}
            title={novel[0]?.novel_name}
            description={novel[0]?.intro}
            genres={[
              novel[0]?.action ? "#action" : "",
              novel[0]?.adventure ? "#adventure" : "",
              novel[0]?.isekai ? "#isekai" : "",
              novel[0]?.fantasy ? "#fantasy" : "",
              novel[0]?.slice_of_life ? "#slice_of_life" : "",
            ].filter(Boolean)}
          />
        ))
      ) : (
        <div className="placeholder-message">
          <p>No books in your reading history yet! Explore novels and start reading to see them here.</p>
        </div>
      )}
    </div>
  </div>
</div>


        </div>
      );
}

export default Homepage