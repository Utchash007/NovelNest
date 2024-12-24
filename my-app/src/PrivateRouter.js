import React, { useEffect, useState } from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";
import { getToken } from "./Common";

const PrivateRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    console.log("getting to authenticate")
    const location = useLocation();
    useEffect(() => {
      console.log("In to authenticate")
        const checkAuth = async () => {
          console.log("In to authenticate 2")
            const token = await getToken();
            setIsAuthenticated(!!token); // Set authentication based on token validity
        };

        checkAuth();
    }, [[location]]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show loading screen while checking authentication
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/LoginSignup" replace />;
};

export default PrivateRouter;
