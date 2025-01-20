import axios from "axios";
import baseUrl from "./URLs";
export const getToken = async () => {
    const storedData = localStorage.getItem("active");
    console.log("Token");
    if (storedData) {
        try {
            const parsedToken = JSON.parse(storedData);
            if (parsedToken.access) {
                const response = await axios.post(baseUrl()+"/api/token/verify/", {
                    token: parsedToken.access,
                });  

                if (response.status === 200) {
                    return true; // Return the token if valid
                }
                if(response.status === 401){
                    console.log("Authentication lost")
                    localStorage.removeItem("active");
                    return false;
                }
            }
        } catch (e) {
            console.error("Error during authentication:", e);
            return false;
            
        }
    }
    console.log("ending");
    localStorage.removeItem("active"); // Clear invalid token
    return false; // Return null if not authenticated
};
