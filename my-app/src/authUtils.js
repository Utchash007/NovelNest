import axios from "axios";

export const isAuthenticated = async () => {
    const storedData = localStorage.getItem("active");

    if (storedData) {
        try {
            const parsedToken = JSON.parse(storedData);
            if (parsedToken.access) {
                const response = await axios.post("http://127.0.0.1:8000/api/token/verify/", {
                    token: parsedToken.access
                });
                if (response.status === 200) {
                    return true;
                } else {
                    localStorage.removeItem("active"); // Clear active memory
                    return false;
                }
            } else {
                localStorage.removeItem("active"); // Clear active memory
                return false;
            }
        } catch (e) {
            console.error("Error during authentication:", e);
            localStorage.removeItem("active"); // Clear active memory on error
            return false;
        }
    }
    return false;
};
