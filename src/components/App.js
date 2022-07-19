import React from "react";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Dashboard from "../pages/Dashboard";
import Info from "../pages/Info";

const App = () => (
    <BrowserRouter>
    <Routes>
        <Route exact path="/react-app" element={ <Dashboard /> } />
        <Route exact path="/react-app/info/:id" element={<Info /> } />
    </Routes>
    </BrowserRouter>
)


export default App