import React, {useState} from 'react';
import '../styling/loginView.css'
import {Link} from 'react-router-dom';

/*TODO: some rendering erro,
   warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
    at a
    at LinkWithRef (http://localhost:3000/static/js/bundle.js:65932:7)
    at small
    at a
    at form
    at div
    at div
    at LoginView (http://localhost:3000/static/js/bundle.js:1985:5)
    at LoginPresenter http://localhost:3000/static/js/bundle.js:790:62)
    at RenderedRoute (http://localhost:3000/static/js/bundle.js:67221:5)
    at Routes (http://localhost:3000/static/js/bundle.js:67711:5)
    at UserAuthContextProvider (http://localhost:3000/main.393225331d46c62e75a3.hot-update.js:52:5)
    at Router (http://localhost:3000/static/js/bundle.js:67649:15)
    at BrowserRouter (http://localhost:3000/static/js/bundle.js:65838:5)
    at div
    at App (http://localhost:3000/static/js/bundle.js:48:100)
*/
function LoginView({username, setUsername, password, setPassword, handleSubmit, error}) {
  const [showError, setShowError] = useState(false);

  function errorHandling() {
    if (!error.message) {
      return '';
    }

    if (error.message.includes("auth/invalid-email")) {
      return "Email not valid, try again";
    }

    if (error.message.includes("auth/user-not-found")) {
      return "No user is connected to this E–Mail"
    }

    if (error.message.includes("auth/wrong-password")) {
      return "Wrong password, please try again";
    }

    if (error.message.includes("auth/internal-error")) {
      return "Please enter a password";
    }

    return error.message;
  }


  function handleInputChange() {
    setShowError(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
    setShowError(!!error);
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
            onChange={(e) => {
              handleInputChange();
              setUsername(e.target.value)
            }}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              handleInputChange();
              setPassword(e.target.value)
            }}
            required
          />
           <a><small><Link to="/reset">forgot your password?</Link></small></a>
          <button className="sign-in" type="submit">Sign in</button>
        </form>
        <button className="create-account">
          <Link to="/signup">Create an account</Link>
        </button>
      </div>
    </div>
  );
}

export default LoginView;
