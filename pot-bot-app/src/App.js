import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import BasePresenter from "./presenters/basePresenter";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import ResetPresenter from "./presenters/resetPsswrdPresenter";

function App() {
    return (
        <div className="App">
                <basePresenter/>
                <Router>
                    <Routes>
                        {/* <Route element={<basePresenter/>}/> */}
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                        <Route path="/reset" element={<ResetPresenter/>}/>
                    </Routes>
                </Router>
        </div>
    );
}

export default App;
