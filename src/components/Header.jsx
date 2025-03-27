import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import logosmall from "../assets/logosmall.png";
import { FaStar, FaUserAlt } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Header = ({ isAsideCollapsed, setIsAsideCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleAside = () => {
    setIsAsideCollapsed(!isAsideCollapsed);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(logOut());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header border-b-1 pb-0 border-[#4C566A] py-[3px] px-[8px] fixed top-0 w-full bg-[#040C1F] z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {!isAsideCollapsed ? (
            <div className="logo ps-10 pb-1 pe-[71px] border-e border-[#4C566A]">
              <img src={logo} alt="Logo" className="w-[100px]" />
            </div>
          ) : (
            <div className="w-[60px] py-3 border-e border-[#4C566A]">
              <img src={logosmall} alt="Logo" className="w-[50px]" />
            </div>
          )}

          <button
            onClick={toggleAside}
            className="p-2 hover:bg-[#1A2C4E] rounded-lg transition-colors duration-200  mx-2"
          >
            {isAsideCollapsed ? (
              <RiMenuUnfoldLine size={24} className="text-[#00E6E6]" />
            ) : (
              <RiMenuFoldLine size={24} className="text-[#00E6E6]" />
            )}
          </button>
        </div>
        <div className="right flex items-center">
          <button
            type="button"
            className="flex me-5 font-bold cursor-pointer justify-center gap-2 items-center bg-[#05F2F2] text-black px-4 py-2 rounded-md shadow-md hover:bg-[#04D2D2] transition"
          >
            <FaStar /> Unlock Full Features
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 bg-[#05F2F2] rounded-full cursor-pointer hover:bg-[#04D2D2] transition"
              onClick={toggleDropdown}
            >
              <FaUserAlt size={19} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-5 w-48 bg-[#040C1F] text-white shadow-lg rounded-md overflow-hidden">
                <Link to={`/account`}>
                  <button
                    className="flex items-center text-[#00E6E6] font-medium justify-start gap-2 w-full text-left px-4 py-2 hover:bg-[#05F2F2] hover:text-black transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <GrUserSettings />
                    My Account
                  </button>
                </Link>
                <button
                  className="flex justify-start items-center gap-2 w-full text-left font-medium px-4 py-2 text-[#00E6E6] hover:bg-red-500 hover:text-white transition"
                  onClick={() => handleLogout()}
                >
                  <IoLogOut size={22} className="ms-[-2px]" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
