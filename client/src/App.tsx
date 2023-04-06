import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

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
            path="/profile"
            element={
              <>
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
