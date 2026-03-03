import { FaStore, FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {useEffect, useState} from 'react';

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div className="h-17.5 bg-custom-gradient text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 cm:px-8 px-4 w-full flex justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr2 text-3xl" />
          <span className="font-[Poppins]">E-Shop</span>
        </Link>

        <ul className="flex text-slate-800 gap-4">
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${path === "/" ? "text-white font-semibold" : "text-gray-200"}`}
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${path === "/products" ? "text-white font-semibold" : "text-gray-200"}`}
              to={"/products"}
            >
              Products
            </Link>
          </li>
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${path === "/about" ? "text-white font-semibold" : "text-gray-200"}`}
              to={"/about"}
            >
              About
            </Link>
          </li>
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${path === "/contact" ? "text-white font-semibold" : "text-gray-200"}`}
              to={"/contact"}
            >
              Contact
            </Link>
          </li>
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${path === "/cart" ? "text-white font-semibold" : "text-gray-200"}`}
              to={"/cart"}
            >
              <Badge
                showZero
                badgeContent={0}
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <FaShoppingCart size={25} />
              </Badge>
            </Link>
          </li>
          <li className="font-medium transition-all duration-150">
            <Link
              className="flex items-center space-x-2 px-4 py-[6px] 
                            bg-linear-to-r from-purple-600 to-red-500 
                            text-white font-semibold rounded-md shadow-lg 
                            hover:from-purple-500 hover:to-red-400 transition 
                            duration-300 ease-in-out transform "
              to={"/login"}
            >
              <FaSignInAlt size={25} />
              <span>Login</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
