import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { FaBeer } from "react-icons/fa";
import Products from "./components/products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/cart/Cart";
import { Toaster } from "react-hot-toast";
import { Login } from "./components/auth/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Register } from "./components/auth/Register";
import { Checkout } from "./components/checkout/Checkout";
import { PaymentConfirmation } from './components/checkout/PaymentConfirmation';
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Router>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/order-confirm' element={<PaymentConfirmation />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
