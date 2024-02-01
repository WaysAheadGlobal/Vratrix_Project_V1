import React, { useState } from "react";
import button from "../images/Sort Down.png";

const Workshop = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="h-screen ">
      <div className="w-full h-20 flex  pt-7 justify-center bg-black relative">
        <div className="relative ">
          <select
            className=" scale-150 text-white bg-black w-36"
            onChange={handleOptionChange}
          >
            <option value="" disabled selected hidden>
              Module_Name
            </option>
            <option value="option1">Duplicate Module</option>
            <option value="option2">Move to Folder</option>
            <option value="option3">Download</option>
            <option value="option3">Share </option>
            <option value="option3">Copy Link</option>
            <option value="option3">Move to Trash</option>
          </select>
        </div>
      </div>
      {/* sidebar */}
      <div className="grid grid-cols-6 h-full w-full">
        <div className=" flex bg-black w-44  relative pt-36">
          <p className="text-white font-bold absolute text-xl">Scene</p>

          <p className="text-white absolute font-bold top-12 text-xl">
            Animation
          </p>
          <p className="text-white absolute  font-bold text-xl top-24">Flow</p>
        </div>
        <iframe
          src="https://poc.vratrix.waysdatalabs.com/webgl/"
          className="col-span-4 bg-[#D9D9D9]  rounded-2xl h-full w-full"
        ></iframe>
        <div className="bg-black w-28 ml-32 relative">
          <p className="text-white absolute font-bold top-0 pl-2 text-xl">
            Gesture
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
