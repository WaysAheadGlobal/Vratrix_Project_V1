import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar_dashboard";
import Slidebar from "../components/slidebar";
import bg from "../images/dashboard-bg.png";
import api from "../Api";
import Cookies from "js-cookie";
import factory1 from '../images/factory1.jpg'
import factory2 from '../images/factory2.jpg'
import factory3 from '../images/factory3.jpg'
import factory4 from '../images/factory4.jpg'
import factory5 from '../images/factory5.jpg'
import io from "socket.io-client";


function HelpCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function TableRow({ socket, model }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const date = new Date(model.createdAt);

  const emitClick = useCallback((sceneName) => {
    console.log("Emitting button-clicked event");
    socket.emit("button-clicked", sceneName);
  }, [socket]);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-[1fr_1fr_1fr_1fr_1fr_1rem] gap-8 py-3 px-4">
      <span className="font-medium">{model.scene_name}</span>
      <span>project1</span>
      <span className="hidden sm:!block">team1</span>
      <span className="hidden sm:!block">frame2</span>
      <span>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>
      <div className="place-self-end url-btn">
        <button
          className="relative right-5"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="justify-self-end text-gray-500">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
        <div className="relative" hidden={!isExpanded}>
          <button className="absolute right-0 z-50 bg-white p-2 border shadow-md rounded-lg w-max"
            onClick={() => {
              emitClick(model.scene_name);
              setIsExpanded(false);
            }}>

            <a href={'https://poc.vratrix.waysdatalabs.com/workshop?scene_name=' + model.scene_name} target="_blank" className="text-blue-500">
              {'https://poc.vratrix.waysdatalabs.com/workshop?scene_name=' + model.scene_name}
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}


function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [models, setModels] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(true);
    }
  }, [])

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        setIsExpanded(false);
      }
    });

    return () => {
      document.removeEventListener("click", () => {
        setIsExpanded(false);
      });
    }
  }, []);

  useEffect(() => {
    /* const socket = io("http://localhost:8000"); */
    const socket = io("https://poc.vratrix.waysdatalabs.com/api");
    socket.on("connect", () => {
      console.log("Connected to server");
      setSocket(socket);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
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
    fetchUser();
  }, []);

  useEffect(() => {
    async function getModels() {
      try {
        let url;
        if (limit === -1) {
          url = `/models/scene-names-details`;
        } else {
          url = `/models/scene-names-details?limit=${limit}`;
        }

        const result = await api.get(url);
        setModels(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    }
    getModels();
  }, [limit]);

  return (
    <>
      <Navbar />
      <section className="flex">
        <Slidebar hidden={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />
        <section className="w-full mx-auto max-w-screen-lg mt-5 px-4">
          <div className="max-w-screen-xl mx-auto min-h-[20rem] rounded-3xl flex flex-col items-center justify-center text-white bg-cover bg-center" style={{
            backgroundImage: `url(${bg})`,
          }}>
            <nav className="flex justify-between items-center w-full px-8 py-4">
              <button onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}>
                <MenuIcon className="text-white w-6 h-6" />
              </button>
              <div className="flex items-start gap-2 justify-center">
                <button
                  className="bg-white text-purple-600 font-semibold text-lg p-4 rounded-xl"
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}
                >
                  Create A Module
                </button>
                <div className="relative isolate">
                  <div className="bg-white text-[#3f3d56] space-y-2 rounded-md py-2 px-2 absolute w-max" hidden={!isExpanded}>
                    <a href="/workshop" className="block hover:bg-gray-200 py-1 px-4 rounded-lg transition-colors">Frame 1</a>
                    <button disabled className="block hover:bg-gray-200 py-1 px-4 rounded-lg transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">Frame 2</button>
                    <button disabled className="block hover:bg-gray-200 py-1 px-4 rounded-lg transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">Frame 3</button>
                    <button disabled className="block hover:bg-gray-200 py-1 px-4 rounded-lg transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">Frame 4</button>
                  </div>
                </div>
              </div>
              <HelpCircleIcon className="text-white w-6 h-6" />
            </nav>
            <div className="w-full max-w-3xl p-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">Popular Templates</h2>
              <div className="flex flex-wrap items-center justify-center sm:!justify-evenly space-x-4 p-4 bg-white rounded-lg shadow-md">
                <img
                  alt="Template 1"
                  className="rounded-full"
                  height="80"
                  src={factory1}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <img
                  alt="Template 2"
                  className="rounded-full"
                  height="80"
                  src={factory2}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <img
                  alt="Template 3"
                  className="rounded-full"
                  height="80"
                  src={factory3}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <img
                  alt="Template 4"
                  className="rounded-full"
                  height="80"
                  src={factory4}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <img
                  alt="Template 5"
                  className="rounded-full"
                  height="80"
                  src={factory5}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
              </div>
            </div>
          </div>
          <div className="text-white p-10 rounded-3xl shadow-md max-w-screen-xl mx-auto my-10 bg-cover bg-center" style={{
            backgroundImage: `url(${bg})`,
          }}>
            <h2 className="text-2xl font-semibold mb-4">Your Recent Work</h2>
            <div className="bg-white text-gray-800 rounded-lg">
              <div className="grid grid-cols-4 sm:grid-cols-[1fr_1fr_1fr_1fr_1fr_1rem] gap-8 py-3 px-4 text-xs font-medium uppercase tracking-wider border-b">
                <span>Name</span>
                <span>Project</span>
                <span className="hidden sm:!block">Team</span>
                <span className="hidden sm:!block">Frame</span>
                <span>Edited</span>
                <span className="place-self-end relative right-6">URL</span>
              </div>
              {models.map((model, index) => (
                <TableRow key={index} socket={socket} model={model} />
              ))}
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-white text-purple-600 py-2 px-4 rounded-xl"
                onClick={() => {
                  setLimit(limit === -1 ? 5 : -1);
                }}
              >
                {
                  limit === -1 ? "Show Less" : "Show More"
                }
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Dashboard;
