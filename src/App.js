import React, { useEffect, useState } from "react";
import {  Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./components/Homepage";
import Update from "./components/update";

function App() {

  const updateTask = (task) => {};
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
