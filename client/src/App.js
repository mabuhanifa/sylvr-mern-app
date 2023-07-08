import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UpdateUser from "./components/UpdateUser";

export default function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<UpdateUser />} path="/update" />
      <Route element={<Home />} path="/" />
    </Routes>
  );
}
