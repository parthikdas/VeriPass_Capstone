import React, { createContext, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import './App.css';
const ParticleBackground = React.lazy(() => import("./Components/Threejs/ParticleBackground"));
const Navbar = React.lazy(() => import("./Components/Navbar/Navbar"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const Login = React.lazy(() => import("./Components/loginSignup/Login"));
const Signup = React.lazy(() => import("./Components/loginSignup/Signup"));
const Profile = React.lazy(() => import("./Components/Profile/Profile"));
const ForgotPassword = React.lazy(() => import("./Components/loginSignup/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./Components/Profile/ResetPassword"));
const TestApi = React.lazy(() => import("./Components/ApiTest/ApiTest"));

export const MyContext = createContext();

export const Popup = (message, time) => {
  const div = document.createElement('div');
  div.innerHTML = message;
  div.id = 'popup';
  document.getElementById('App').appendChild(div);
  setTimeout(() => {
    console.log('remove')
    document.getElementById('App').removeChild(div);
  }, 6000);
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post("http://localhost:8084/auth/verifyToken", {}, {
          withCredentials: true
        });
        if (response.data === "verified") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuth(false);
      }
    };
    validateToken();
  }, []);
  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])
  return (
    <div className="App" id='App'>
      <MyContext.Provider value={{ isAuth, setIsAuth }}>
        <Router>
          <ParticleBackground />
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgotPassword' element={<ForgotPassword />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/resetPassword' element={<ResetPassword />} />
              <Route path='/testApi' element={<TestApi />} />
            </Routes>
          </Suspense>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
