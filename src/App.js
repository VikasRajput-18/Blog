import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";


const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <>
      <nav className="d-flex justify-content-center align-items-center">
        <Link to="/" className="text-decoration-none text-white">
          Home
        </Link>

        {!isAuth ? (
          <Link to="/login" className="text-decoration-none text-white">
            Login
          </Link>
        ) : (
          <>
            <Link to="/createpost" className="text-decoration-none text-white">
              Create Post
            </Link>
            <button onClick={() => signUserOut()} className="btn btn-danger">
              Logout
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        {!isAuth && (
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        )}
      </Routes>
    </>
  );
};

export default App;
