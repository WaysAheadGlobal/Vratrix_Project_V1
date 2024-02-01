import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../images/login.png";
import api from "../Api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handlePopupClose = () => {
    document.cookie =
      "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "subscription=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const sendOtp = async () => {
    try {
      const response = await api.post("/login/otp", { email });
      if (response && response.data && response.data.success) {
        setIsOtpSent(true);
      } else {
        setError("Error sending OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.includes("User does not exist")
      ) {
        setError("User does not exist. Please check your email.");
      } else {
        setError("Error sending OTP. Please try again.");
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, otp });
      if (
        response &&
        response.data &&
        response.data.message === "Login successful"
      ) {
        if (response.data.status === 0) {
          return false;
        }
        const userCookie = response.headers["set-cookie"];
        console.log("Logged In Succesfully");
        window.location.href = "/";
        if (userCookie) {
          localStorage.setItem("userCookie", userCookie);
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <img src={bg} className="absolute w-screen h-screen"></img>
        <div className="bg-white md:w-1/4  space-y-8 rounded-xl p-4 shadow-xl shadow-white z-10">
          <h1 className="font-semibold text-center text-4xl">Welcome Back</h1>
          {error && (
            <div
              className={`fixed bottom-5  z-20 right-5 bg-white py-2 text-sm ${
                error ? "opacity-100" : "opacity-0"
              } p-3 flex transition-all duration-700  items-center shadow-xl border-4 rounded-md border-red-500`}
            >
              <p className="text-red-500 text-center">{error}</p>
            </div>
          )}
          {isOtpSent && (
            <div
              className={`fixed bottom-5 right-5 bg-white py-2 text-sm ${
                isOtpSent ? "opacity-100" : "opacity-0"
              } p-3 flex transition-all duration-700  items-center shadow-xl border-4 rounded-md border-green-500`}
            >
              <p className="text-green-500  text-center">
                OTP sent succesfully
              </p>
            </div>
          )}
          <form onSubmit={handleLogin} className="">
            <div className="flex space-y-2 flex-col">
              <label for="email" className="px-2 font-light">
                Email ID
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-md shadow-md"
              ></input>
            </div>
            <div className="flex justify-between  my-5">
              <div className="flex space-x-1">
                <input
                  className={`w-20 h-6 rounded-md bg-[#8B3DFF1a] border border-[#8B3DFF] text-center ${
                    !isOtpSent && "bg-gray-200 cursor-not-allowed"
                  } transition-all duration-300`}
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  type="text"
                  placeholder="* * * * "
                  required
                  maxLength={4}
                ></input>
              </div>
              <div className="font-light">
                {!isOtpSent ? (
                  <button onClick={sendOtp} type="button">
                    <a>Send OTP</a>
                  </button>
                ) : (
                  <a className="text-gray-400">OTP already sent</a>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                className="bg-black w-full h-10 uppercase flex items-center text-white justify-center"
                type="submit"
              >
                Login
              </button>
              <p className="font-light text-sm text-center inline-flex w-full justify-center">
                Enter login details or
                <Link to="/sign-up" className="text-[#8B3Dff] px-1">
                  Create an account.{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
