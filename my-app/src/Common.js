import axios from "axios";

export const getToken = async () => {
    const storedData = localStorage.getItem("active");
    console.log("Token");
    if (storedData) {
        try {
            const parsedToken = JSON.parse(storedData);
            if (parsedToken.access) {
                const response = await axios.post("http://127.0.0.1:8000/api/token/verify/", {
                    token: parsedToken.access,
                });  

                if (response.status === 200) {
                    return parsedToken.access; // Return the token if valid
                }
                if(response.status === 401){
                    console.log("Authentication lost")
                    localStorage.removeItem("active");
                    return null;
                }
            }
        } catch (e) {
          
           
            console.error("Error during authentication:", e);
            return null;
            
        }
    }
    console.log("ending");
    localStorage.removeItem("active"); // Clear invalid token
    return null; // Return null if not authenticated
};
