import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Header from "./components/Header";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import ResetPresenter from "./presenters/resetPasswordPresenter";
import AddPlantPresenter from "./presenters/AddPlantPresenter";
//import PlantPresenter from "./presenters/PlantPresenter";
import {UserAuthContextProvider} from "./firebaseModel";
import HomePresenter from "./presenters/HomePresenter";
import ChangeUserName from "./views/ChangeUserName";

function App() {
    return (
        <div className="App">
                <Header/>
                <Router>
                    <UserAuthContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginPresenter/>}/>
                        <Route path="/signup" element={<SignUpPresenter/>}/>
                        <Route path="/reset" element={<ResetPresenter/>}/>
                        <Route path="/name" element={<ChangeUserName />}/>
                        <Route path="/home" element={<HomePresenter/>}/>
                        <Route path="/addNewPlant" element={<AddPlantPresenter/>}/>
                        {/* <Route path="/home/plants" element={<PlantPresenter/>}/> */}
                    </Routes>
                    </UserAuthContextProvider>
                </Router>
        </div>
    );
}

export default App;
