import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Navbar from "../components/layout/Navbar";

export default function AppRoutes() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  
  // Reset search when navigating away from home
  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <>
      <Toaster position="top-right" />
      
      {/* Pass search props only on home page */}
      <Navbar 
        search={location.pathname === "/" ? search : undefined}
        setSearch={location.pathname === "/" ? handleSearch : undefined}
      />
      
      <Routes>
        <Route 
          path="/" 
          element={<Home search={search} setSearch={setSearch} />} 
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>   
  );
}