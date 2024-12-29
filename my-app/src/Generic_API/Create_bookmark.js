import axios from "axios";

export const Create_bookmark = async (user_id, novel_id) => {
    try{
        const response = await axios.post('http://127.0.0.1:8000/api/bookmark/', {
            id: user_id,          // Replace with actual ID
            novel_id: novel_id,  // Replace with actual Novel ID
          })

          if (response.status === 201) {
            console.log("Bookmark created successfully");
            return true; // Return the token if valid
        }    
    }catch(err){
        console.log(err);
        return false;
    }
}