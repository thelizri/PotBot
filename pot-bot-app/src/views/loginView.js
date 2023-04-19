import React, { useState } from 'react';
import '../styling/loginView.css'
import { Link } from 'react-router-dom';
function LoginView() {
//Will move this to presenter later on
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  }

  return (
    <div>
      <h1>PotBot.</h1>
      <div className="container">
        <p className='pLogin'>Log into your PotBot account</p>
        <form onSubmit={handleSubmit}>
          <input type="email" id="email" name="email" placeholder="E-mail" required />
          <input type="password" id="password" name="password" placeholder="Password" required />
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
