import React, { useState } from 'react';
import '../styling/loginView.css'
import { Link } from 'react-router-dom';

function LoginView({ username, setUsername, password, setPassword, handleSubmit, inputError }) {
  const [showError, setShowError] = useState(false);
  function errorHandling() {
    if (!inputError.message) {
      return '';
    }
  
    if (inputError.message.includes("auth/email-already-in-use")) {
      return "Email is already in use";
    }
  
    if (inputError.message.includes("auth/invalid-email")) {
      return "Email not valid, try again";
    }
  
    if (inputError.message.includes("auth/weak-password")) {
      return "Password should be at least 6 characters";
    }
  
    if (inputError.message.includes("auth/wrong-password")) {
      return "Wrong password, please try again";
    }
  
    if (inputError.message.includes("auth/internal-error")) {
      return "Please enter a password";
    }
  
    return inputError.message;
  }


  
  function handleInputChange() {
    setShowError(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
    setShowError(!!inputError);
  }
  
  return (
    <div>
      <div className="container">
        <p className='pLogin'>Log into your PotBot account</p>
        <div className={`error ${showError ? '' : 'errorhidden'}`}>
          {errorHandling()}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={username}
            onChange={(e) => { handleInputChange(); setUsername(e.target.value) }}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { handleInputChange(); setPassword(e.target.value) }}
            required
          />
           <a><small><Link to="/reset">forgot your password?</Link></small></a>
          <button type="submit">Sign in</button>
        </form>
        <button className="create-account">
          <Link to="/signup">Create an account</Link>
        </button>
      </div>
    </div>
  );
}

export default LoginView;
