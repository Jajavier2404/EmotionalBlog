import { Routes, Route } from "react-router-dom";
import Home from "../Home/page/Home";
import Login from "../Login/pages/login";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />

        </Routes>
    )
}
