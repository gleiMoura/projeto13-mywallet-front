import React from "react";
import Register from "./register";
import Login from "./login";
import Finance from "./finance"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/finance" element={<Finance />}></Route>
            </Routes>
        </BrowserRouter>
    </>
}