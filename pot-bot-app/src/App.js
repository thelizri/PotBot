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
import PlantSearch from "./components/PlantSearch";
import { useState } from "react";

function App() {
    const [personalPlantList, setPersonalPlantList] = useState([]);
    const addPlantToPersonalList = (plant) => {
        setPersonalPlantList([...personalPlantList, plant]);
      };
      return (
        <div className='App'>
          <Header />
          <Router>
            <UserAuthContextProvider>
              <Routes>
                <Route path='/' element={<LoginPresenter />} />
                <Route path='/signup' element={<SignUpPresenter />} />
                <Route path='/reset' element={<ResetPresenter />} />
                <Route path='/name' element={<ChangeUserName />} />
                <Route path='/home' element={<HomePresenter personalPlantList={personalPlantList} />} />
                <Route
                  path='/addNewPlant'
                  element={<AddPlantPresenter addPlantToPersonalList={addPlantToPersonalList} />}
                />
                {/* <Route path='/home/plants' element={<PlantPresenter />} /> */}
              </Routes>
            </UserAuthContextProvider>
          </Router>
        </div>
      );
    }
    
    export default App;