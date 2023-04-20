import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import BasePresenter from "./presenters/basePresenter";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import ResetPresenter from "./presenters/resetPsswrdPresenter";
import {UserAuthContextProvider} from "./firebaseModel";
import HomePresenter from "./presenters/HomePresenter";
function App() {
    return (
        <div className="App">
                <basePresenter/>
                <Router>
                    <UserAuthContextProvider>
                    <Routes>
                        {/* <Route element={<basePresenter/>}/> */}
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                        <Route path="/reset" element={<ResetPresenter/>}/>
                        <Route path="/home" element={<HomePresenter/>}/>
                    </Routes>
                    </UserAuthContextProvider>
                </Router>
        </div>
    );
}

export default App;
