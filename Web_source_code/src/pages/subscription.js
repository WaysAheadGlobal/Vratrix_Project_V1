import React, { useEffect, useState } from 'react';
import bgplans from "../images/Mask group.jpg";
import plan1 from "../images/plan1.png";
import plan2 from "../images/plan2.png";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import Cookies from 'js-cookie';
import api from '../Api';
import Aos from 'aos';

export const Subscription = () => {
  const [screenWidth, setScreenWidth] = useState(calculateInitialWidth);
  const [plan, setPlan] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(false);
  const [subscription, setSubscription] = useState(0);
  const [user, setUser] = useState([]);

  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  useEffect(() => {
    setSubscription(user.subscription);
  }, [user]);

  useEffect(() => {
    setSubscription(user.subscription);
  }, [user]);





  const handleSubscription = async (event) => {
    event.preventDefault();
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const response = await api.post(`/subscription/${uid}`, {
        subscription: event.target.id,
      });
      fetchUser();
      window.location.href = "/payment";
    } catch (error) {
      console.error("Error Subscribing in:", error);
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

  useEffect(() => {
    Aos.init({
      duration: 900, // You can adjust the duration as needed
      once: true, // Set to true if you want the animation to occur only once
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(calculateInitialWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateInitialWidth() {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? window.innerWidth - 40 : window.innerWidth - 40 * 8;
  }




  return (
    <>
      <Navbar />
      <div className=''>
        <img
          src={bgplans}
          className="w-screen object-cover  -z-10 inset-0 "
        ></img>

        {/* <div className=" w-screen bg-black opacity-70 h-3/4">
            <h2 className='text-center text-white font-bold pt-36 md:pt-48 lg:pt-56 xl:pt-72 text-2xl'>Plans</h2>
        </div> */}
        <div className="w-full h-screen absolute -z-10 inset-0 "></div>
        {/* </div> */}
        {/* plans */}

        <div className="text-center w-full flex flex-col justify-center pt-10">
          <h1 className="font-custom1  text-[48px] proportional-nums   ">
            Choose your Plan
          </h1>
          <p className=" font-custom  text-[24px] self-center tracking-wide">
            Discover Your Perfect Price with our plans : <br /> Tailored Solutions,
            Transparent Choices and Unbeatable Value
          </p>
        </div>
        <div className="md:flex z-10 md:space-x-32 md:space-y-0 space-y-4 px-4 md:px-0 pt-10 py-40 justify-center">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => setPlan(0)}
              className={`border border-[#8B3DFF] ${plan === 0 ? "bg-[#8B3DFF] text-white" : ""
                } px-4 p-2 rounded-md`}
            >
              Subscription
            </button>
            <button
              onClick={() => setPlan(1)}
              className={`border border-[#8B3DFF] ${plan === 1 ? "bg-[#8B3DFF] text-white" : ""
                } px-4 p-2 rounded-md`}
            >
              Consultation
            </button>
            <button
              onClick={() => setPlan(2)}
              className={`border border-[#8B3DFF] ${plan === 2 ? "bg-[#8B3DFF] text-white" : ""
                } px-4 p-2 rounded-md`}
            >
              Pay per Use
            </button>
          </div>

          {plan === 0 && (
            <div className="md:flex md:space-x-5 md:space-y-0 space-y-4">
              <div className="border flex w-full md:w-60 flex-col h-fit justify-center items-center space-y-4  px-6 rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 49<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Essential</h1>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Access to essential VR Design Tools</p>
                  </p>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Standard Support for Technical Assitance</p>
                  </p>
                  <button
                    id={1}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 1
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 1}
                  >
                    {subscription === 1 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 1 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-full md:w-60 text-white h-fit bg-[#111727] flex-col justify-center px-6 items-center space-y-4  rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 99<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan2} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold text-[#E2FEA1]">Standard</h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Access to essential VR Design Tools</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Enhanced Support with Priority Response</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Customization Options</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Regular Updates</p>
                  </p>
                  <button
                    id={2}
                    onClick={handleSubscription}
                    className={`bg-[#8B3DFF] rounded-full p-1 px-6 ${subscription !== 2
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 2}
                  >
                    {subscription === 2 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 2 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-full md:w-60 flex-col h-fit justify-center items-center space-y-4 rounded-xl px-6 p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 199<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Premium</h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Complete Access</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Priority Support</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Advanced Analytics</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Regular Updates</p>
                  </p>
                  <button
                    id={3}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 3
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 3}
                  >
                    {subscription === 3 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 3 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {plan === 1 && (
            <div className="md:flex md:space-x-5 md:space-y-0 space-y-4">
              <div className="border flex w-full md:w-60 flex-col h-fit justify-center items-center space-y-4  px-6 rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 5,999<span className="text-sm font-light">/tool</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col  items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className=" text-center font-bold">
                    Initial Design Consultation
                  </h1>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>In-depth Analysis of requirements</p>
                  </p>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Strategies for tailored VR module designs</p>
                  </p>
                  <button
                    id={4}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 4
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 4}
                  >
                    {subscription === 4 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 4 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-full md:w-60 text-white h-fit bg-[#111727] flex-col justify-center px-6 items-center space-y-4  rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 1,499<span className="text-sm font-light">/tool</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan2} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold text-center text-[#E2FEA1]">
                    Custom Tool Development
                  </h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Re-developing and crafting existing tools</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Creating new tools for unique needs</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Flexible Design Framework</p>
                  </p>

                  <button
                    id={5}
                    onClick={handleSubscription}
                    className={`bg-[#8B3DFF] rounded-full p-1 px-6 ${subscription !== 5
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 5}
                  >
                    {subscription === 5 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 5 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-full md:w-60 flex-col h-fit justify-center items-center space-y-4 rounded-xl px-6 p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 2,999<span className="text-sm font-light">/tool</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Hosting Consultation</h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Cross Platform Compatibility</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Data Security and Privacy Compliance</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>CDN Integration</p>
                  </p>

                  <button
                    id={6}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 6
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 6}
                  >
                    {subscription === 6 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 6 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {plan === 2 && (
            <div className="md:flex md:space-x-5 md:space-y-0 space-y-4">
              <div className="border flex w-full md:w-60 flex-col h-fit justify-center items-center space-y-4  px-6 rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 149<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Essential</h1>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Access to essential VR Design Tools</p>
                  </p>
                  <p className="font-light text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Standard Support for Technical Assitance</p>
                  </p>
                  <button
                    id={7}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 7
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 7}
                  >
                    {subscription === 7 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 7 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-full md:w-60 text-white h-fit bg-[#111727] flex-col justify-center px-6 items-center space-y-4  rounded-xl p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 249<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan2} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Standard</h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Access to essential VR Design Tool</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Enhanced Support with Priority Response</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Customization Options</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#ffffff"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Regular Updates</p>
                  </p>
                  <button
                    id={8}
                    onClick={handleSubscription}
                    className={`bg-[#8B3DFF] rounded-full p-1 px-6 ${subscription !== 8
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 8}
                  >
                    {subscription === 8 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 8 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex w-60 flex-col h-fit justify-center items-center space-y-4 rounded-xl px-6 p-4 divide-y">
                <h2 className="text-lg font-bold">
                  $ 349<span className="text-sm font-light">/month</span>
                </h2>
                <div className="space-y-8 w-full flex flex-col items-center">
                  <img src={plan1} className="object-cover w-14 pt-4"></img>
                  <h1 className="font-bold">Premium</h1>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Complete Access</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Priority Support</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Advanced Analytics</p>
                  </p>
                  <p className="font-light self-start text-sm flex items-center  space-x-3">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.45688L3.65013 6.58655L8.31544 1.07701"
                        stroke="#111727"
                        stroke-width="1.24362"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Regular Updates</p>
                  </p>
                  <button
                    id={9}
                    onClick={handleSubscription}
                    className={`border rounded-full p-1 px-6 ${subscription !== 9
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                      }`}
                    disabled={subscription === 9}
                  >
                    {subscription === 9 ? "Current Plan" : "Choose Plan"}
                  </button>
                  {subscription === 9 && user.sub_expires_at && (
                    <p className="text-gray-500 text-sm">
                      Valid till:{" "}
                      {/* {moment(user.sub_expires_at).format("MMMM DD, YYYY")} */}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


        <Footer />
      </div>
    </>
  )
}
