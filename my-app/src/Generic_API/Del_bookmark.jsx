import axios from "axios";

export const Del_bookmark = async (bookmark_id) => {
    try{
        const response = await axios.delete("http://127.0.0.1:8000/api/bookmark/"+bookmark_id+"/");
        if (response.status === 200) {
            return true; // Return the token if valid
        }

    }catch(err){
        console.log(err);
        return false;
    }
}