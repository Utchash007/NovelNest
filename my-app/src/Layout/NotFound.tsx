import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      padding: "2rem",
    }}>
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#762ef3" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#333" }}>
        Page Not Found
      </h2>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "400px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 30px",
          backgroundColor: "#762ef3",
          color: "#fff",
          borderRadius: "20px",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: 500,
          transition: "background-color 0.3s",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
