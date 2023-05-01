import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/me"
            element={<Profile />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
