import LoginPage from './components/LoginPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
              </>
            }
          />
          <Route path="/signup" element={<></>} />
          <Route index element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
