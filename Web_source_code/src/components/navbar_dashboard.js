import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/navbar_logo.png";
import notification from "../images/notifications.png";
import setting from "../images/settings.png";
import user from "../images/user.png";

export default function Navbar_dashboard() {
  return (

    <nav className="z-50 bg-white flex w-full items-center sticky top-0 justify-between py-1 px-2 rounded-b-lg shadow-md shadow-gray-400 ">
      <Link to="/">
        <img src={logo} className="h-12"></img>
      </Link>
      <div className="flex gap-6">
        <button
          className="h-8 w-8"
          onClick={() => {
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/";
          }}
        >
          <span title="logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out text-blue-500"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
          </span>
        </button>
        <img src={notification} className="h-8 object-cover"></img>
        <img src={setting} className="h-8 object-cover"></img>
        <img src={user} className="h-8 object-cover"></img>
      </div>
    </nav>
  );
}
