import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
