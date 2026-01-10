import axios from "axios";

export const create_read=async(time,user_id,novel_id,cpt_no)=>{
    try{
        const response= await axios.post("http://127.0.0.1:8000/api/user_history/",{
            timeline : time,
            id:user_id,
            novel_id:novel_id,
            cpt_no:cpt_no,
        })

        if (response.status === 201) {
            console.log("Read Record created successfully");
            return true; // Return the token if valid
        } 
    }catch(e){
        console.log(e);
        return false;
    }
}