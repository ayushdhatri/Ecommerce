import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart, FaUserShield } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {BackDrop} from '../components/BackDrop';
import {logOutUser} from '../store/actions/index';
import {toast} from 'react-hot-toast';
export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () =>{
    dispatch(logOutUser(navigate,toast));
    }

  return (
    <div className="relative z-30">
      <div
        className="sm:border sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 }
        }}
      >
        <Link >
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <BiUser className="text-xl" />
            <span className="font-semibold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>

        <Link >
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link>

        <Link >
          <MenuItem className="flex gap-2 bg-button-gradient items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
 onClick={logOutHandler}>
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Logout</span>
          </MenuItem>
        </Link>
      </Menu>
      {open && <BackDrop /> }
    </div>
  );
};

export default UserMenu;
