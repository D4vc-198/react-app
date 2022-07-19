import React from "react";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Dashboard from "../pages/Dashboard";
import Info from "../pages/Info";

const App = () => (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={ <Dashboard /> } />
        <Route exact path="/info/:id" element={<Info /> } />
    </Routes>
    </BrowserRouter>
)


export default App