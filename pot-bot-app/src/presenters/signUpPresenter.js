/* UseState over here */
import React from 'react';
import SignupView from "../views/signUpView";
import HomePresenter from "./HomePresenter";
import {useAuth} from "../firebaseModel";

function SignUpPresenter() {
    const {user} = useAuth();
    return (
        <>
            {!user && <SignupView/>}
            {user && <HomePresenter/>}
        </>
    );
}

export default SignUpPresenter;