import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import LoginSignup from './LoginSignup/LoginSignup';
import { isAuthenticated } from './authUtils';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
    };

    checkAuthentication();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <App /> : <LoginSignup onLoginSuccess={handleLoginSuccess} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
