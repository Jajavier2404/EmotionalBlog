import { Routes, Route } from "react-router-dom";
import Home from "../Home/page/Home";
import Login from "../forms/pages/login";
import NotFound from "../NotFound/page/notFound";
import ForgotPassword from "../forms/pages/ForgotPassword";
import BlogPage from "../blog/pages/BlogPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
    </Routes>
  );
}
