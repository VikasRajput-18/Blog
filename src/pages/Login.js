import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {auth , provider} from '../firebase'

const Login = ({ setIsAuth }) => {
    const navigate = useNavigate()
  const signInwithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth" , true)
        setIsAuth(true)
        navigate('/')
    });
  };
  return (
    <div className="loginPage">
      <button className="login-with-google-btn" onClick={()=> signInwithGoogle()}>Signin With Google</button>
    </div>
  );
};

export default Login