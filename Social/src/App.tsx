import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./Components/Userauth/Signup";
import { Signin } from "./Components/Userauth/Signin";
import { Home } from "./Components/Dashboard/Home/Home";


export default function App() {
  return (<Router>
<Routes>
  <Route path="/" element={<Signin/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/home" element={<Home/>} />
</Routes>
    </Router>
  )
}