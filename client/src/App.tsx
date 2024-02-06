
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/protected";
import Signin from "./pages/Signin";
import Test from "./pages/Test";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={ 
        // <Navigate to="/signin" /> 
        <Landing />
      } />
      <Route path="/dash" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App;
