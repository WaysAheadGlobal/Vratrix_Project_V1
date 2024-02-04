import React, { useState, useEffect } from "react";
import api from "../Api.js";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../images/navbar_logo.png";
import burger from "../images/navbar_burger.png";
import navbar_header from "../images/navbar_header.png";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [click, setClick] = useState(false);
  const [fullname, setfullname] = useState("");
  const [category, setCategory] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [FindProfessionals, setFindProfessionals] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHomeOwner, setHomeOwner] = useState(false);
  const [isBuilder, setBuilder] = useState(false);
  const [isSupplier, setSupplier] = useState(false);
  const [isDesiginer, setDesigner] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    checkLoginStatus(); // Check if user is logged in when component mounts
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setfullname(user.name);
  }, [user]);

  const checkLoginStatus = () => {
    try {
      const user_id = Cookies.get("user_id");
      if (user_id) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching details", error);
      setIsLoggedIn(false);
      setfullname(""); // Reset the fullname state in case of an error
      setCategory(""); // Reset the fullname state in case of an error
    }
  };

  const fetchUser = async () => {
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const userDisplay = await api.get(`/userdata/${uid}`);
      setUser(userDisplay.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="fixed z-50 translate-y-10  w-full ">
        <div className=" rounded-full bg-white h-14 flex justify-center overflow-hidden items-center md:mx-20 shadow-md">
          <div className="flex md:w-full justify-between items-center md:pl-6 px-0">
            <Link to="/">
              <img src={logo} className="h-12"></img>
            </Link>
            <div className="md:flex space-x-9  items-center ">
              <a
                href="/#about"
                className="hidden md:block font-raleway font-semibold hover:text-[#3466AA] focus:text-[#3466AA] text-sm transition-all"
              >
                About Us
              </a>
              <a
                href="/#features"
                className="hidden md:block font-raleway font-semibold hover:text-[#3466AA] focus:text-[#3466AA] text-sm transition-all "
              >
                Features
              </a>
              <a
                href="/#plans"
                className="hidden md:block font-raleway font-semibold hover:text-[#3466AA] focus:text-[#3466AA] text-sm transition-all "
              >
                Plans
              </a>
              <a
                href="/#teams"
                className="hidden md:block font-raleway font-semibold hover:text-[#3466AA] focus:text-[#3466AA] text-sm transition-all "
              >
                Our Team
              </a>
              <button
                className="md:hidden"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                <img src={burger} className=""></img>
              </button>
              <a
                href="/#faq"
                className="hidden md:block font-raleway font-semibold hover:text-[#3466AA] focus:text-[#3466AA] text-sm transition-all "
              >
                FAQ
              </a>
            </div>
            {isLoggedIn ? (
              <Link to="/dashboard" className="flex items-center font-raleway bg-[#8B3DFF] rounded-full px-7 h-[44px] m-[10px] text-white">
                {fullname}
              </Link>
            ) : (
              <Link
                to="/log-in"
                className="flex items-center font-raleway bg-[#8B3DFF] rounded-full px-7 h-[44px] m-[10px] text-white"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </div>
      <div
        className={`z-20 md:hidden w-full  ${!isExpanded && " translate-x-full"
          } transition-all duration-300 h-full fixed bg-[#3466AA]`}
      >
        <button
          className="fixed right-0 p-4 "
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            style={{ fill: "white" }}
          >
            <path
              d="M11 0.7H13V23.3H11z"
              transform="rotate(-45.001 12 12)"
            ></path>
            <path
              d="M0.7 11H23.3V13H0.7z"
              transform="rotate(-45.001 12 12)"
            ></path>
          </svg>
        </button>

        <div className="items-center h-full justify-center space-y-7 flex flex-col uppercase">
          <Link
            to="/"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-raleway text-white text-2xl"
          >
            Home
          </Link>
          <Link
            to="/"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-raleway text-white text-2xl"
          >
            Services
          </Link>
          <Link
            to="/"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-raleway text-white text-2xl"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-raleway text-white text-2xl"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
