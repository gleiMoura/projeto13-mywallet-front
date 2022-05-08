import React from "react";
import Register from "./register";
import Login from "./login";
import Finance from "./finance"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataContext from './dataContext';
import { useState } from "react";

export default function App() {
    const [data, setData] = useState([]);

    return <>
        <dataContext.Provider value={{ data, setData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setData={setData} />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/finance" element={<Finance />}></Route>
                </Routes>
            </BrowserRouter>
        </dataContext.Provider>
    </>
}