import React, { useState } from 'react';
import LoginView from "../views/loginView";
import {useAuth} from "../firebaseModel";
import {useNavigate } from "react-router-dom";
import HomePresenter from "./HomePresenter";

function LoginPresenter() {
    const {user,signIn} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState('');
    let navigate = useNavigate("/home");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn(username, password);
            navigate('/home');
        }catch (err) {
           //console.log(err.message);
            setInputError(err);
        }
    }

    return (
        <>
            {!user && <LoginView
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                inputError={inputError}
            />}
            {user && <HomePresenter/>}
        </>
    );
}

export default LoginPresenter;
