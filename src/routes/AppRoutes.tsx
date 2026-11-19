import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from '../pages/About';
import NotFound from "../pages/NotFound";
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/contact" element={<Contact/>} />
      {/* 404 - Page Not Found */}
      <Route path="*" element={<NotFound />} />
   </Routes>
  )
}

export default AppRoutes