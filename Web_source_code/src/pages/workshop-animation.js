import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import HeaderIcon from '../images/icon13.png'; // Make sure the path is correct

const Animation = () => {
  const customUnderlineStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const customUnderlineAfterStyle = {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: 'white',
    width: '110%', // Adjust the width as needed
    marginLeft: '-5%', // Center the underline
  };
  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-1/6 bg-gray-800 pb-6 px-6 space-y-6">
        {/* Link to dashboard */}
        <Link to="/dashboard" className="text-yellow-500 text-lg cursor-pointer pt-10 flex gap-2 items-center">
          <MdOutlineKeyboardBackspace className="text-yellow-500 text-2xl" />
          Dashboard
        </Link>
        {/* Scene with hover effect */}
        <div className="border-b border-gray-600 pb-4 cursor-pointer pt-10">
          <Link to="/workshop" className="text-white hover:text-yellow-500 text-lg cursor-pointer">
            Scene
          </Link>
        </div>
        {/* Animation: Disabled */}
        <div className="border-b border-gray-600 pb-4 cursor-pointer">
          <Link to="/animation" className="text-yellow-500  text-lg cursor-pointer">
            Animation
          </Link>
        </div>
        {/* Flow */}
        <div className="border-b border-gray-600 pb-4 text-gray-400 text-lg cursor-not-allowed">
          {/* <Link to="/flow" className="text-white hover:text-yellow-500 text-lg cursor-pointer">
            Flow
          </Link> */}
          <p>Flow</p>
        </div>
      </div>

      {/* Main Content and Right Sidebar Container */}
      <div className="flex-grow flex flex-col">
        {/* Header with Module Name centered and Dropdown Arrow */}
        <div className="flex items-center justify-between p-6 bg-gray-800 text-white">
          {/* Placeholder for potential additional elements on the left side */}
          <div className="w-1/6"></div>
          {/* Module Name Dropdown centered */}
          <div className="relative w-1/6">
            <select
              className="scale-150 text-white bg-gray-800 w-full"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Module Name
              </option>
              <option value="option1">Duplicate Module</option>
              <option value="option2">Move to Folder</option>
              <option value="option3">Download</option>
              <option value="option4">Share</option>
              <option value="option5">Copy Link</option>
              <option value="option6">Move to Trash</option>
            </select>
          </div>
          {/* Right side icons */}
          <div className="flex w-1/4 justify-end">
            <img src={HeaderIcon} alt="Header Icon" className="w-80 h-11" />
          </div>
        </div>

        {/* Content and Right Sidebar */}
        <div className="flex flex-grow">
          {/* WebGL Unity iFrame */}
          <iframe
            title='Animation'
            src="https://poc.vratrix.waysdatalabs.com/webgl/"
            className="bg-gray-300 rounded-2xl"
            style={{ flex: 1, height: 'calc(100vh - 5rem)' }} // Adjust the height if necessary
            frameBorder="0"
          ></iframe>

          {/* Right Sidebar */}
          <div className="w-1/7 bg-gray-800 p-6 flex flex-col items-center">
            {/* Characters Text slightly above */}
            <div className="border-b border-gray-400 pb-4 cursor-pointer mt-[-2rem]"> {/* Adjusted margin-top to 8 */}
              <Link to="/workshop1" className="text-white text-lg text-[18px] tracking-wider cursor-pointer">
                Gestures
              </Link>
            </div>

            <div className="border-b border-gray-400 pb-4 cursor-pointer mt-80"> {/* Adjusted margin-top to 8 */}
              <Link to="/workshop1" className="text-white text-lg text-[18px] tracking-wider cursor-pointer">
                Audio
              </Link>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
