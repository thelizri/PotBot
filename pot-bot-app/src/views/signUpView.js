import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import '../styling/loginView.css'

function SignupView({ username, setUsername, password, setPassword, handleSubmit, error}) {
  const [showError, setShowError] = useState(false);
  function errorHandling() {
    if (!error.message) {
      return '';
    }
  
    if (error.message.includes("auth/email-already-in-use")) {
      return "Email is already in use";
    }
  
    if (error.message.includes("auth/invalid-email")) {
      return "Email not valid, try again";
    }
  
    if (error.message.includes("auth/weak-password")) {
      return "Password should be at least 6 characters";
    }
  
    if (error.message.includes("auth/wrong-password")) {
      return "Wrong password, please try again";
    }
  
    if (error.message.includes("auth/internal-error")) {
      return "Please enter a password";
    }
  
    console.log(error.message);
    return error.message;
  }


  function handleInputChange() {
    setShowError(false);
  }

  return (
    <div>
      <div className="container">
        <h1 className="h1SignIN">Create an account</h1>
        <div className={`error ${showError ? '' : 'errorhidden'}`}>
          {errorHandling()}adad
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="E-Mail"
            value={username}
            onChange={(e) => {handleInputChange(); setUsername(e.target.value)}}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {handleInputChange(); setPassword(e.target.value)}}
            required
          />
          <button type="submit">Sign up</button>
          <button className="create-account">
            <Link to="/">Back to login</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupView;
