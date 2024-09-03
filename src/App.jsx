import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Verify from "./component/verify";
import Success from "./component/success";

function App() {

  return (
    <>
    <Routes>
      <Route path = "/" element ={<Login/>}/>
      <Route path = "/verify" element ={<Verify/>}/>
      <Route path = "/success" element ={<Success/>}/>
    </Routes>
    </>
  )
}

export default App
