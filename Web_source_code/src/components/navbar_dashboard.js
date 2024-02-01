import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/navbar_logo.png";
import notification from "../images/notifications.png";
import setting from "../images/settings.png";
import user from "../images/user.png";
import burger from "../images/navbar_burger.png";
import navbar_header from "../images/navbar_header.png";

export default function Navbar_dashboard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div>
        <div className=" z-50 bg-white flex w-full items-center fixed top-0 justify-between py-1 px-2 rounded-b-lg shadow-md shadow-gray-400 ">
          <Link to="/">
            <img src={logo} className="h-12"></img>
          </Link>
          <div className="flex space-x-2">
            <img src={notification} className="h-8 object-cover"></img>
            <img src={setting} className="h-8 object-cover"></img>
            <img src={user} className="h-8 object-cover"></img>
          </div>
        </div>
      </div>
    </>
  );
}
