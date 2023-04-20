import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import {UserAuthContextProvider} from "./firebaseModel";
import HomePresenter from "./presenters/HomePresenter";
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <UserAuthContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                        <Route path="/home" element={<HomePresenter/>}/>
                    </Routes>
                    </UserAuthContextProvider>
                </Router>
            </header>
        </div>
    );
}

export default App;
