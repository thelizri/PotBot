import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPresenter from "./presenters/LoginPresenter";
import SignUpPresenter from "./presenters/SignUpPresenter";
import ResetPasswordPresenter from "./presenters/ResetPasswordPresenter";
import AddPlantPresenter from "./presenters/AddPlantPresenter";
import HomePresenter from "./presenters/HomePresenter";
import HistoryPresenter from "./presenters/HistoryPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import ProfilePresenter from "./presenters/ProfilePresenter";
import ChangeUserName from "./views/ChangeUserName";
import { UserAuthContextProvider } from "./firebaseModel";
import SideMenuView from "./views/SideMenuView";
// import SettingsView from "./views/SettingsView";
import "./styling/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          {/* Render the side menu view on all pages except login and signup */}
          {window.location.pathname !== "/signup" &&
          window.location.pathname !== "/login" && <SideMenuView />}
          <Header />
          <Routes>
            <Route path="/" element={<LoginPresenter />} />
            <Route path="/signup" element={<SignUpPresenter />} />
            <Route path="/reset" element={<ResetPasswordPresenter />} />
            <Route path="/name" element={<ChangeUserName />} />
            <Route path="/home" element={<HomePresenter />} />
            <Route path="/settings/:plantName" element={<SettingsPresenter />} />
            <Route
              path="/addNewPlant"
              element={<AddPlantPresenter />}
            />
            <Route path="/history/:plantName" element={<HistoryPresenter />} />
            <Route path="/profile" element={<ProfilePresenter />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
