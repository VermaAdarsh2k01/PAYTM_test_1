import { BrowserRouter , Route , Routes } from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import  {Dashboard}  from "./pages/Dashboard";
import {SendMoney}  from "./pages/SendMoney";
import Hero2 from "./pages/Hero2";
import './App.css'
import UpdateBalance from "./pages/UpdateBalance";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero2/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/update" element={<UpdateBalance/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App