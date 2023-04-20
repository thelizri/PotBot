import React, { useState } from 'react';
import '../styling/loginView.css'
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../firebaseModel";
function LoginView() {
//Will move this to presenter later on
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log('Username:', username);
    //console.log('Password:', password);
    try {
      await signIn(username, password);
      navigate('/home');

    }catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>PotBot.</h1>
      <div className="container">
        <p className='pLogin'>Log into your PotBot account</p>
        <form onSubmit={handleSubmit}>
          <input type="email" id="email" name="email" placeholder="E-mail"
                 onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" id="password" name="password" placeholder="Password"
                 onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign in</button>
          <button className="create-account">
          <Link to="/signup">Create an account</Link>
        </button>
        </form>
      </div>
    </div>
  );
  
}

export default LoginView;
