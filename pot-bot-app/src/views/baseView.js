import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styling/baseView.css'

// This is a base component, not a view per say. 
// Maybe this requires some structural changes
// It consists of a header that can be applied to all views
function BaseView(){
    return(
        <div>
            <h1>PotBot.</h1>
            <hr></hr>
        </div>
      ) 
}

export default BaseView;