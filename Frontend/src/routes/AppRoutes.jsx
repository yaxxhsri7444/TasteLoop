import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/PartnerRegister";
import PartnerLogin from "../pages/PartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/foodpartner/CreateFood";
import Profile from "../pages/foodpartner/profile";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Navigate to="/user/login" replace />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<PartnerRegister />} />
            <Route path="/food-partner/login" element={<PartnerLogin />} />
            <Route path="/food-partner/:id" element={<Profile/>} />
            <Route path="/" element={<Home />} />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="*" element={<Navigate to="/user/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
