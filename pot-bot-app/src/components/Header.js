import React from 'react';
import {Link} from "react-router-dom";

function Header() {
  return (
    <div>
      <Link className="header" to="/home"><h1>PotBot.</h1></Link>
      <hr></hr>
    </div>
  );
}

export default Header;
