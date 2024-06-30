import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard";
import { Transfer } from "./pages/Transfer";
import { Signin } from "./pages/Signin";
import { Me } from './pages/Me';
function App() {
  return (<>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Transfer />} />
        <Route path="/" element={<Me />} />
      </Routes>
  </>
  )
}

export default App;
