import React from "react";
import {Link} from "react-router-dom";

export default function ConnectPotBotView({loading, productID, setProductID, handleSubmit}) {

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <div className="connect">
      {loading ? <div className="loading">Connecting </div> :
        <form className="connect" onSubmit={handleFormSubmit}>
          <p style={{fontSize: "20px"}}>Connect your potBot device</p>
          <input name='connect' type='productID' placeholder='Enter device number' value={productID}
                 onChange={(e) => setProductID(e.target.value)}/>
          <button name='connect' type='submit'>Connect</button>
          <Link to='/home'>Back to plants</Link>
        </form>}
    </div>
  )
}
