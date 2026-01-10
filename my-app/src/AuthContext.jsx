import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const verifyToken = async () => {
        const storedData = localStorage.getItem("active");
        if (storedData) {
            try {
                const parsedToken = JSON.parse(storedData);
                if (parsedToken.access) {
                    const response = await axios.post("http://127.0.0.1:8000/api/token/verify/", {
                        token: parsedToken.access
                    });
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        return;
                    }
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        }
        localStorage.removeItem("active"); // Clear invalid token
        setIsAuthenticated(false);
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
