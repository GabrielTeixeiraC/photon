import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Sidebar />}
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
