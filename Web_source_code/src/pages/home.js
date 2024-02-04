import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import api from "../Api.js";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import back from "../images/3 334.png";
import img1 from "../images/4 552.png";
import backgroundImg from '../images/bg_landing.png';
import img3 from "../images/image 39.png";
import img2 from "../images/image 41.png";
import plan1 from "../images/plan1.png";
import plan2 from "../images/plan2.png";
import "../style/main.css";

function Line() {
  return (
    <svg width="1155" height="24" viewBox="0 0 1155 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0H1163V23.6375H0L20 0Z" fill="#2F8FC0" />
    </svg>
  )
}

function LineLeft() {
  return (
    <svg width="1163" height="24" viewBox="0 0 1163 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1143 24L0 24V0L1163 0L1143 24Z" fill="#2F8FC0" />
    </svg>
  )
}

export default function Home() {
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
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setSubscription(user.subscription);
  }, [user]);

  // useEffect(() => {
  //   checkLoginStatus();
  //   fetchUser();
  // }, []);

  const checkLoginStatus = () => {
    const connectSidCookie = Cookies.get("user_id");
    if (connectSidCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleSubscription = async (event) => {
    event.preventDefault();
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const response = await api.post(`/subscription/${uid}`, {
        subscription: event.target.id,
      });
      fetchUser();
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
    AOS.init({
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
      <div className="max-w-screen-2xl mx-auto">
        <div
          className="h-screen bg-cover bg-no-repeat bg-center"
          style={{
            background: `url(${backgroundImg})`,
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center text-center bg-black !bg-opacity-70"
            data-aos="fade-up"
          >
            <div className="h-screen justify-center items-center m-5 mx-6 scale-105 flex flex-col">
              <h1 className="font-custom1  proportional-nums md:text-4.5xl text-[44px] leading-[44px] text-[#f2f3f4]  py-5 md:py-7 w-fit">
                Transforming Training with Immersive Simulations
                <br /> for Real-World Excellence
              </h1>
              <p className="font-custom font-bold text-[#f2f3f4] text-[24px] md:font-normal md:w-2/3">
                Redefining Power Sector training with VR modules, personalized
                support, and advanced features for enhanced skills.
              </p>
              <ScrollLink to="about" smooth={true} duration={900}>
                <button className="border rounded-full hover:opacity-75 hover:scale-105 transition-all duration-500 md:w-48 w-40 text-[#f2f3f4] md:text-lg mt-10 font-custom1 tracking-widest p-2">
                  Start Now
                </button>
              </ScrollLink>{" "}
            </div>
          </div>
        </div>

        {/* About */}

        <div id="about" className="space-y-10 mt-20">
          <div className="md:mx-40 justify-center md:space-x-12 md:flex">
            <img
              src={img1}
              className="md:h-[530px] w-[500px] md:p-2 p-5   md:mx-10 md:w-1/2 object-cover"
              data-aos="fade-in"
            ></img>
            <div
              className="text-center px-8 md:px-0 md:text-left flex flex-col "
              data-aos="fade-in"
            >
              <h2 className="font-custom1 justify-center text-xl md:text-[44px]  md:leading-[80px]   border-[#114084]  mb-3 ">
                About Us <br className="md:block hidden" />
              </h2>
              <p className="font-custom md:leading-2 text-justify  justify-center text-[16px] px--10 md:px--10">
                At Vratrix, we lead the charge in revolutionizing VR training
                for the power industry. Committed to reshaping training
                methodologies, we confront industry challenges through immersive
                simulations. Our collaborative approach prioritizes tailored
                modules, ensuring seamless integration across diverse power
                sectors.
                <br />
                <br />
                Join us in shaping a safer, more skilled, and proficient
                workforce as we are dedicated to ushering in a new era of
                excellence through cutting-edge virtual reality solutions that
                redefine how professionals in the power industry learn and
                excel.
              </p>
            </div>
          </div>
          <section className="flex flex-col gap-1">
            <span className="self-end">
              <Line />
            </span>
            <div id="features" className="py-16 flex flex-col items-center space-y-10 text-center bg-[#000325]">
              <h2 className="font-custom1 text-[48px] text-white">Features</h2>
              <p className="font-custom w-[700px] font-light text-lg text-white">
                Discover Exceptional Features: Elevate Your Experience with
                Cutting-Edge Functionality and Unmatched Performance!
              </p>
              <div className="space-y-8">
                {/* Use grid to create a consistent layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white justify-center">
                  {/* Each feature card */}
                  <div className="bg-[#8B3DFF] p-2 md:w-60 w-48 px-4 md:h-60 h-40 py-5 flex flex-col justify-center space-y-6 rounded-3xl hidden md:block">
                    <h1 className=" font-custom1 tracking-wider uppercase justify-center">
                      LIFELIKE VR SIMULATIONS
                    </h1>
                    <p className="font-custom text-center text-[14px] tracking-wider ">
                      Immersive modules enhance training, replicating real-world
                      scenarios for comprehensive skill development and effective
                      learning experiences.
                    </p>
                  </div>
                  <div className="bg-[#8B3DFF] p-3 md:w-60 w-48 px-4 md:h-60 h-40 py-5 flex flex-col justify-center space-y-6 rounded-3xl hidden md:block">
                    <h1 className=" font-custom1 tracking-wider uppercase">
                      INTERACTIVE <br /> MODULES
                    </h1>
                    <p className="font-custom text-center text-[14px] tracking-wider ">
                      Engaging experiences fostering skill development in safety
                      protocols, technical operations, and maintenance procedures.
                    </p>
                  </div>
                  <div className="bg-[#8B3DFF] p-3 md:w-60 w-48 px-4 md:h-60 h-40 py-5 flex flex-col justify-center space-y-6 rounded-3xl hidden md:block">
                    <h1 className=" font-custom1 tracking-wider uppercase">
                      ASSET <br /> COLLABORATION
                    </h1>
                    <p className="font-custom text-center text-[14px] tracking-wider ">
                      Incorporation of industry-specific assets, branded
                      environments, and adaptive learning strategies.
                    </p>
                  </div>
                </div>
                <div className="flex text-white justify-center md:space-x-4 space-x-2">
                  <div className="bg-[#8B3DFF] p-3 md:w-60 w-48 px-4 md:h-60 h-40 py-5 flex flex-col justify-center space-y-6 rounded-3xl hidden md:block">
                    <h1 className=" font-custom1 tracking-wider uppercase">
                      SEAMLEASS INTEGRATION
                    </h1>
                    <p className="font-custom text-center text-[14px] tracking-wider ">
                      Adaptable platform ensuring integration into various
                      business processes while meeting industry-specific needs.
                    </p>
                  </div>
                  <div className="bg-[#8B3DFF] p-3 md:w-60 w-48 px-4 md:h-60 h-40 py-5 flex flex-col justify-center space-y-6 rounded-3xl hidden md:block">
                    <h1 className=" font-custom1 tracking-wider uppercase">
                      Robust <br /> Data tracking
                    </h1>
                    <p className="font-custom text-center tracking-wider  text-[14px] ">
                      Comprehensive metrics enabling insights into training
                      effectiveness and compliance metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div id="plans" className="text-center w-full flex flex-col justify-center">
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="1.24362"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        {moment(user.sub_expires_at).format("MMMM DD, YYYY")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="md:px-40 py-12  bg-[#000325] text-center md:text-left justify-center md:space-x-12 md:flex">
            <div
              id="teams"
              className="justify-top  flex flex-col md:pr-32  md:mx-10"
              data-aos="fade-right"
            >
              <h2 className="font-custom1 text-[38px] md:text-[38px] text-white md:leading-[80px] py-3">
                Our Team
              </h2>
              <p className="font-custom1 leading-6 text-[20px] px-8 md:px-0  font-light  text-justify  text-[#C9BBBB] ">
                Get Acquainted with the Passionate Individuals Dedicated to
                Enhancing Your Vratrix Experience.
              </p>
            </div>
            <div className="flex md:space-x-6 space-x-3">
              <div className="flex flex-col justify-center text-center  md:bg-[#8B3DFF] rounded-md overflow-hidden">
                <img
                  src={img2}
                  className="md:h-full  w-[360px] mt-32 md:mt-0  object-cover"
                  data-aos="fade-in"
                ></img>
                <h2 className="text-white pt-1 font-bold">Thu Chau <br /> Hoang</h2>
                <p className="text-white text-sm pb-2 font-thin">
                  Co-Founder & CEO
                </p>
              </div>
              <div className="flex flex-col justify-center text-center md:bg-[#8B3DFF] rounded-md overflow-hidden">
                <img
                  src={img3}
                  className="md:h-full w-[360px] mt-32 md:mt-0  object-cover"
                  data-aos="fade-in"
                ></img>
                <h2 className="text-white pt-1 font-bold">Bao Hoang <br /> Nguyen</h2>
                <p className="text-white text-sm pb-2 font-thin">
                  Co-Founder & CEO
                </p>
              </div>
            </div>
          </div>

          {/* FAQ section */}

          <section id="faq" className="flex flex-col">
            <div className="mt-5 md:mt-24 " id="faq">
              <div className="relative w-fit md:w-full flex flex-col mx-2 md:mx-0 md:">
                <div className="md:head">
                  <h3 className="font-custom1 text-[48px] md:text-center pl-4 -my-8 md:-my-0 md:pl-0">
                    Frequently Asked Questions{" "}
                  </h3>
                </div>
              </div>
            </div>
            <div className="accodion_custom md:mt-16  px-2 md:px-32 mt-n10">
              <Accordion
                className="ac_item"
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  className="ac_head"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                >
                  <Typography className="ac_head_cont ">
                    <p className="font-semibold">
                      1. What distinguishes VR simulations from traditional
                      training methods and how do they enhance learning
                      experiences ?
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ac_bdy">
                  <Typography className="ac_bdy_cont">
                    VR simulations offer immersive, interactive environments that
                    replicate real-world scenarios. Unlike traditional methods,
                    they provide hands-on experiences, fostering better retention,
                    engagement, and practical skill development. Users can
                    navigate and interact within a virtual setting, creating a
                    dynamic learning environment that significantly enhances the
                    effectiveness of training programs.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="ac_item"
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  className="ac_head"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className="ac_head_cont">
                    <p className="font-semibold">
                      2. How will the training modules work and will they be
                      interactive ?
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ac_bdy">
                  <Typography className="ac_bdy_cont">
                    You can often tour models of factory-built homes at
                    dealerships, showrooms, or manufacturers' facilities. Contact
                    the manufacturer or dealership associated with the model
                    you're interested in to inquire about available locations for
                    tours or showings. Many companies also participate in home
                    expos or trade shows where they display their models for
                    public viewing.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="ac_item"
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  className="ac_head"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className="ac_head_cont">
                    <p className="font-semibold">
                      3. How to collaborate with other trainers ?
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ac_bdy">
                  <Typography className="ac_bdy_cont">
                    Factory-built homes are usually not designed to be placed in
                    basements due to their construction and transportation
                    methods. Their structure isn't typically conducive to basement
                    installation. Site-built homes are more adaptable for basement
                    construction, offering designs that can integrate with
                    basement foundations during on-site building.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="ac_item"
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  className="ac_head"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5bh-content"
                  id="panel5bh-header"
                >
                  <Typography className="ac_head_cont">
                    <p className="font-semibold">
                      4. What is the process of making modules ?
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ac_bdy">
                  <Typography className="ac_bdy_cont">
                    Factory-built homes are constructed in controlled
                    environments, then transported and assembled on-site, offering
                    faster, standardized construction. However site-built homes
                    offer limitless customization, allowing owners to create
                    unique designs. They promote local employment, fostering
                    community ties and craftsmanship. Their on-site construction
                    process enables adaptation to specific needs, and they often
                    showcase higher architectural complexity and individuality,
                    reflecting personal preferences and creativity.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="self-start mt-10">
              <LineLeft />
            </div>
          </section>
          <div className="p-10 ">
            <div className="hidden md:block pt-24 relative">
              <img src={back} className="w-full h-auto rounded-xl"></img>
              <div className="absolute top-52 left-0 w-full h-auto bottom-0 bg-black rounded-2xl opacity-80 p-10"></div>
              <div className=" font-poppins absolute  top-52 font-bold text-[48px] left-0 w-full h-auto text-center text-white">
                <p>Elevate Learning with VRATRIX </p>
              </div>
              <div className="  absolute  top-[300px] text-[20px] left-0 w-full h-auto text-center text-white">
                <p>
                  Begin your journey with Immersive Simulations, Real Skills and
                  Total Excellence.{" "}
                </p>
              </div>
              <div className="absolute  top-[360px] text-[18px] left-0 w-full h-auto text-center">
                <button className="text-white border w-48 h-16 rounded-full ">
                  {" "}
                  <a href="/log-in">Get Started</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
