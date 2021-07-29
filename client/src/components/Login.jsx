
import React from "react";
import axios from 'axios';
function Login() {
  function click_google() {
    axios
    .get("http://localhost:9000/auth/google")
    .then(res => {
      console.log(res.data);
    })
  }
  return (
    <div className="login-outer">
      <div className="login">
        <h1>
          Login
        </h1>
        <div className="social-btn">
          <a href="http://localhost:9000/auth/google" className="btn btn-block btn-social btn-google shadow-none"><span class="fab fa-google"></span> Sign in with Google</a>
        </div>
      </div>
    </div>
  );
}
export default Login;
