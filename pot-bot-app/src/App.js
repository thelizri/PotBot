import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import BasePresenter from "./presenters/basePresenter";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import ResetPresenter from "./presenters/resetPsswrdPresenter";
import {UserAuthContextProvider} from "./firebaseModel";
import HomePresenter from "./presenters/HomePresenter";
import ChangeUserName from "./views/ChangeUserName";
import PlantPresenter from "./presenters/PlantPresenter";
function App() {
    return (
        <div className="App">
                <BasePresenter/>
                <Router>
                    <UserAuthContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                        <Route path="/reset" element={<ResetPresenter/>}/>
                        <Route path="/home" element={<HomePresenter/>}/>
                        <Route path="/name" element={<ChangeUserName />}/>
                        <Route path="/home/plants" element={<PlantPresenter/>}/>
                    </Routes>
                    </UserAuthContextProvider>
                </Router>
        </div>
    );
}

export default App;
