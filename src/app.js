import React from "react";
import Register from "./register";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    </>
}