import LoginView from "./views/loginView";
import SignUpView from "./views/signUpView";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  BrowserRouter as Router,
  Routes,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/signup" element={<SignUpView />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
