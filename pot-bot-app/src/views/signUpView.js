import { Link } from "react-router-dom";
import { useState } from "react";
import '../styling/loginView.css'

function SignupView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };


  return (
    <div>

<h1>PotBot.</h1>
    <div className="container">
    <h1 className="h1SignIN">Create an account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="username" name="username" placeholder="E-Mail" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Sign up</button>
        <button className="create-account" ><Link to="/">Back to login</Link></button>
      </form>
    </div>

    </div> 
  );
}

export default SignupView;