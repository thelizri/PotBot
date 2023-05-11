import React, {useEffect, useState} from "react";
import { useLocation, useParams } from 'react-router-dom';
import ProfileView from "../views/ProfileView";

function ProfilePresenter(){
    return <ProfileView/>
}

export default ProfilePresenter;