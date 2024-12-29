import React, { useEffect, useState } from "react";
import Card from "../template/card";
import axios from "axios";
import { decode } from "../decodeJWT";
const Bookmark=()=>{
    
      const user_id=(decode(localStorage.getItem("active"))).user_id;
        //console.log(user_id);

      const [Bookmarks,setBookmarks]=useState([]);
      const[BookmarkedNovels,setBookmarkedNovels ]=useState([]);

      useEffect(() => {
        console.log("Fetching bookmarks for user:", user_id); // Debug log before API call
        axios
            .get("http://127.0.0.1:8000/api/bookmarks/get/?id=" + user_id)
            .then((response) => {
                console.log("Bookmarks API Response:", response.data); // Debug log for bookmarks API response
                setBookmarks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching bookmarks:", error.message); // Debug log for errors
            });
    }, [user_id]);

    useEffect(() => {
        if (Bookmarks.length === 0) {
            console.log("No bookmarks found, skipping novel details fetch."); // Debug log for no bookmarks
            return;
        }

        console.log("Fetching details for bookmarked novels:", Bookmarks); // Debug log for bookmarks state

        const novel_ids = Bookmarks.map((bookmark) => bookmark.novel_id);
        const novelRequests = novel_ids.map((novel_id) =>
            axios.get("http://127.0.0.1:8000/api/novels/novel/?novel_id=" + novel_id)
        );

        Promise.all(novelRequests)
            .then((responses) => {
                console.log("Novel Details API Responses:", responses); // Debug log for novel API responses
                const details = responses.map((response) => response.data);
                console.log("Extracted Novel Details:", details); // Debug log for extracted data
                setBookmarkedNovels(details);
            })
            .catch((error) => {
                console.error("Error fetching novel details:", error.message); // Debug log for errors
            });
    }, [Bookmarks]);


     return (
        <div>
            <div className="field">
            <div className="heading">
              <h1><a href="#">Action</a></h1>
            </div>
            <div className="container">
              <div className="card__container">
              {BookmarkedNovels.map((novel, index) => {
    console.log(novel);
    console.log("Rendering Card for Novel:");
    console.log("novel_id:", novel[0]?.novel_id);
    console.log("novel_name:", novel[0]?.novel_name);
    console.log("novel_img_link:", novel[0]?.novel_img_link);
    console.log("description:", novel[0]?.intro);
    console.log("genres:", [
        novel[0]?.action ? "#action" : "",
        novel[0]?.adventure ? "#adventure" : "",
        novel[0]?.isekai ? "#isekai" : "",
        novel[0]?.fantasy ? "#fantasy" : "",
        novel[0]?.slice_of_life ? "#slice_of_life" : "",
    ].filter(Boolean));

    return (
        <Card
            key={(novel[0]?.novel_id || "") + "-" + index} // Concatenate strings without backticks
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
    );
})}
              </div>
            </div>
          </div>
        </div>
     )   
}

export default Bookmark;