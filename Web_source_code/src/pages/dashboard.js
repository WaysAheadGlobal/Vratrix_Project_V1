import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar_dashboard";
import bg from "../images/dashboard_bg.jpg";
import bg1 from "../images/dashboard_bg_1.jpg";

function Dashboard() {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-screen overflow-hidden">
        <div className="w-screen h-screen md:justify-center items-center mt-10 md:mt-44 flex flex-col">
          <div className="md:p-8 p-2 pt-8 py-2 md:pt-0 md:py-0">
            <img
              src={bg}
              className="object-cover rounded-lg md:rounded-3xl "
            ></img>
          </div>
          <div className="md:p-8 p-2 py-2 md:pt-0 md:py-0">
            <img
              src={bg1}
              className="object-cover  rounded-lg md:rounded-3xl "
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
