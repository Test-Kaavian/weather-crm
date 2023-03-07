/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';

export default function Login() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const togglePassword = (e) => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const checkInfo = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setMessage('Enter the fields..');
    } else {
      fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/login`, { method: 'POST', body: JSON.stringify({ username, password }), headers: { 'content-type': 'application/json' } })
        .then((res) => res.json())
        // eslint-disable-next-line consistent-return
        .then((data) => {
          if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            navigate('/Home');
          }
          setMessage(data.data);
        });
    }
  };
  return (
    <div className="loginPage">
      <div className="google-button-div">
        <LoginSocialGoogle
          client_id="951762083449-p9kh4tcft4e2occplic7gppq50fumlpi.apps.googleusercontent.com"
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log(provider, data);
            const userEmail = data.email;
            fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/login/gamil`, { method: 'POST', body: JSON.stringify({ userEmail }), headers: { 'content-type': 'application/json' } })
              .then((res) => res.json())
              .then((emailDetails) => {
                if (emailDetails.status === 'success') {
                  localStorage.setItem('token', emailDetails.token);
                  navigate('/Home');
                }
                setMessage(emailDetails.data);
              });
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <div className="google">
            <GoogleLoginButton />
          </div>
        </LoginSocialGoogle>
      </div>
      <div className="circle2" />
      <div className="login">
        {/* <img className="img1" src="images/snowman.svg" alt="" /> */}
        {/* <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity={1} d="M0,0L40,0C80,0,160,0,240,16C320,32,400,64,480,96C560,128,640,160,720,160C800,160,880,128,960,101.3C1040,75,1120,53,1200,69.3C1280,85,1360,139,1400,165.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" /></svg>
        <svg className="svg2 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity={1} d="M0,160L48,154.7C96,149,192,139,288,117.3C384,96,480,64,576,74.7C672,85,768,139,864,138.7C960,139,1056,85,1152,53.3C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" /></svg> */}
        <img className="img4" src="images/cloud.png" alt="cloud" />
        <img className="img5" src="images/snowman.svg" alt="snow" />
        <img className="img6" src="images/cat.svg" alt="cat" />
        <div className="desingc" />
        <div className="loginForm">
          <h1 className="loginh1">LOGIN</h1>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type={passwordShown ? 'text' : 'password'}
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="button" className="showPassword" onClick={togglePassword}>👀</button>
          <button type="button" className="loginButton" onClick={checkInfo}>LOGIN</button>
        </div>
        <div className="loginPageErrorMessage">{message ? `*${message}` : ''}</div>
      </div>
    </div>
  );
}
