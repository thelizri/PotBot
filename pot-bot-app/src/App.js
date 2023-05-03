import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Header from "./components/Header";
import LoginPresenter from "./presenters/LoginPresenter";
import SignUpPresenter from "./presenters/SignUpPresenter";
import ResetPasswordPresenter from "./presenters/ResetPasswordPresenter";
import AddPlantPresenter from "./presenters/AddPlantPresenter";
import {UserAuthContextProvider} from "./firebaseModel";
import HomePresenter from "./presenters/HomePresenter";
import ChangeUserName from "./views/ChangeUserName";
import './styling/App.css'
import {useState} from "react";

function App() {
  const [personalPlantList, setPersonalPlantList] = useState([]);
  const addPlantToPersonalList = (plant) => {
    setPersonalPlantList([...personalPlantList, plant]);
  };
  return (
    <div className='App'>
      <Header/>
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/' element={<LoginPresenter/>}/>
            <Route path='/signup' element={<SignUpPresenter/>}/>
            <Route path='/reset' element={<ResetPasswordPresenter/>}/>
            <Route path='/name' element={<ChangeUserName/>}/>
            <Route path='/home' element={<HomePresenter personalPlantList={personalPlantList}/>}/>
            <Route
              path='/addNewPlant'
              element={<AddPlantPresenter addPlantToPersonalList={addPlantToPersonalList}/>}
            />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
