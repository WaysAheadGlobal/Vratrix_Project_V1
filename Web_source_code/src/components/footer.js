import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";

export default function footer() {
  return (
    <div className='w-full z-10 p-5 pb-0 md:px-14 px-6 bg-[#000325]'>
      <div className='md:flex justify-between pb-4 md:px-8 md:pr-4 '>
        <div className='md:w-1/3'>
          <p className='text-white py-6 md:py-8 mr-32 font-custom1 font-thin md:font-extralight'>Pioneering VR Training for the power sector, we offer progressive modules, personalized support, and cutting-edge features. Elevate skills with immersive learning for enhanced performance and safety excellence.</p>
          <div className='flex space-x-4'>
            <button className='twitter'>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="4" fill="#8B3DFF" />
                <g clipPath="url(#clip0_38_2525)">
                  <path d="M36 16.5585C35.1075 16.95 34.1565 17.2095 33.165 17.3355C34.185 16.7265 34.9635 15.7695 35.3295 14.616C34.3785 15.183 33.3285 15.5835 32.2095 15.807C31.3065 14.8455 30.0195 14.25 28.6155 14.25C25.8915 14.25 23.6985 16.461 23.6985 19.1715C23.6985 19.5615 23.7315 19.9365 23.8125 20.2935C19.722 20.094 16.1025 18.1335 13.671 15.147C13.2465 15.8835 12.9975 16.7265 12.9975 17.634C12.9975 19.338 13.875 20.8485 15.183 21.723C14.3925 21.708 13.617 21.4785 12.96 21.117C12.96 21.132 12.96 21.1515 12.96 21.171C12.96 23.562 14.6655 25.548 16.902 26.0055C16.5015 26.115 16.065 26.1675 15.612 26.1675C15.297 26.1675 14.979 26.1495 14.6805 26.0835C15.318 28.032 17.127 29.4645 19.278 29.511C17.604 30.8205 15.4785 31.6095 13.1775 31.6095C12.774 31.6095 12.387 31.5915 12 31.542C14.1795 32.9475 16.7625 33.75 19.548 33.75C28.602 33.75 33.552 26.25 33.552 19.749C33.552 19.5315 33.5445 19.3215 33.534 19.113C34.5105 18.42 35.331 17.5545 36 16.5585Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_38_2525">
                    <rect x="12" y="12" width="24" height="24" rx="2" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button className='linkedin'>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="#8B3DFF" />
                <rect width="48" height="48" rx="2" fill="white" fillOpacity="0.05" />
                <g clipPath="url(#clip0_38_2528)">
                  <path d="M35.9943 36.0002V35.9992H36.0003V27.1972C36.0003 22.8912 35.0733 19.5742 30.0393 19.5742C27.6193 19.5742 25.9953 20.9022 25.3323 22.1612H25.2623V19.9762H20.4893V35.9992H25.4593V28.0652C25.4593 25.9762 25.8553 23.9562 28.4423 23.9562C30.9913 23.9562 31.0293 26.3402 31.0293 28.1992V36.0002H35.9943Z" fill="white" />
                  <path d="M12.3965 19.9768H17.3725V35.9998H12.3965V19.9768Z" fill="white" />
                  <path d="M14.882 12C13.291 12 12 13.291 12 14.882C12 16.473 13.291 17.791 14.882 17.791C16.473 17.791 17.764 16.473 17.764 14.882C17.763 13.291 16.472 12 14.882 12V12Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_38_2528">
                    <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className='instagram'>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="#8B3DFF" />
                <rect width="48" height="48" rx="2" fill="white" fillOpacity="0.05" />
                <g clipPath="url(#clip0_38_2531)">
                  <path d="M35.9279 19.0525C35.8694 17.7751 35.6666 16.9028 35.3699 16.1396C35.0687 15.3389 34.5963 14.6136 33.9858 14.0142C33.3865 13.4037 32.6611 12.9311 31.8604 12.6297C31.097 12.3333 30.2249 12.1306 28.9475 12.0725C27.6678 12.0139 27.2589 12 24 12C20.7411 12 20.3322 12.0139 19.0525 12.0721C17.7751 12.1306 16.903 12.3334 16.1396 12.6301C15.3389 12.9313 14.6136 13.4037 14.0142 14.0142C13.4037 14.6135 12.9311 15.3387 12.6297 16.1395C12.3333 16.9028 12.1306 17.7751 12.0725 19.0523C12.0139 20.3322 12 20.7409 12 23.9998C12 27.2589 12.0139 27.6678 12.0725 28.9475C12.1307 30.2247 12.3336 31.097 12.6302 31.8604C12.9315 32.6609 13.4039 33.3864 14.0143 33.9857C14.6136 34.5961 15.3391 35.0685 16.1398 35.3698C16.903 35.6666 17.7753 35.8693 19.0527 35.9277C20.3326 35.9861 20.7413 35.9998 24.0002 35.9998C27.2591 35.9998 27.668 35.9861 28.9477 35.9277C30.225 35.8693 31.0972 35.6666 31.8605 35.3698C33.4724 34.7465 34.7466 33.4722 35.3699 31.8604C35.6667 31.097 35.8694 30.2247 35.9279 28.9475C35.9861 27.6676 36 27.2589 36 24C36 20.7409 35.9861 20.3322 35.9279 19.0525ZM33.7678 28.8492C33.7145 30.0192 33.5189 30.6546 33.3547 31.0774C32.9509 32.124 32.1238 32.9511 31.0772 33.3549C30.6544 33.5191 30.019 33.7147 28.849 33.7679C27.5839 33.8258 27.2043 33.8379 24 33.8379C20.7955 33.8379 20.4161 33.8258 19.1508 33.7679C17.981 33.7147 17.3456 33.5191 16.9226 33.3549C16.4015 33.1624 15.93 32.8557 15.5429 32.4571C15.1443 32.07 14.8376 31.5987 14.6451 31.0774C14.4809 30.6546 14.2853 30.0192 14.2321 28.8492C14.1744 27.5839 14.1621 27.2043 14.1621 24.0002C14.1621 20.7958 14.1744 20.4164 14.2321 19.151C14.2855 17.981 14.4809 17.3456 14.6451 16.9228C14.8376 16.4015 15.1445 15.93 15.5429 15.5429C15.93 15.1443 16.4015 14.8376 16.9228 14.6453C17.3456 14.4809 17.981 14.2855 19.151 14.2321C20.4163 14.1744 20.7958 14.1621 24 14.1621H23.9998C27.204 14.1621 27.5836 14.1744 28.849 14.2322C30.019 14.2855 30.6542 14.4811 31.0772 14.6453C31.5983 14.8378 32.0698 15.1445 32.4569 15.5429C32.8555 15.93 33.1622 16.4015 33.3545 16.9228C33.5189 17.3456 33.7145 17.981 33.7678 19.151C33.8254 20.4163 33.8377 20.7958 33.8377 24C33.8377 27.2043 33.8256 27.5837 33.7678 28.8492Z" fill="white" />
                  <path d="M23.9999 17.8379C20.5967 17.8379 17.8379 20.5969 17.8379 24.0001C17.8379 27.4033 20.5967 30.1622 23.9999 30.1622C27.4033 30.1622 30.1622 27.4033 30.1622 24.0001C30.1622 20.5969 27.4033 17.8379 23.9999 17.8379ZM23.9999 28.0001C21.791 27.9999 20 26.2091 20.0002 23.9999C20.0002 21.791 21.791 20 24.0001 20C26.2093 20.0002 28.0001 21.791 28.0001 23.9999C28.0001 26.2091 26.2091 28.0001 23.9999 28.0001Z" fill="white" />
                  <path d="M31.8459 17.5944C31.8459 18.3896 31.2012 19.0344 30.4059 19.0344C29.6105 19.0344 28.9658 18.3896 28.9658 17.5944C28.9658 16.799 29.6105 16.1543 30.4059 16.1543C31.2012 16.1543 31.8459 16.799 31.8459 17.5944Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_38_2531">
                    <rect x="12" y="12" width="24" height="24" rx="2" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className='facebook'>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="#8B3DFF" />
                <rect width="48" height="48" rx="2" fill="white" fillOpacity="0.05" />
                <g clipPath="url(#clip0_38_2534)">
                  <path d="M27.9965 15.985H30.1875V12.169C29.8095 12.117 28.5095 12 26.9955 12C23.8365 12 21.6725 13.987 21.6725 17.639V21H18.1865V25.266H21.6725V36H25.9465V25.267H29.2915L29.8225 21.001H25.9455V18.062C25.9465 16.829 26.2785 15.985 27.9965 15.985Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_38_2534">
                    <rect x="12" y="12" width="24" height="24" rx="2" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div className='md:w-1/2 md:p-4 h-full space-x-8 flex justify-evenly'>
          <div className='flex-col space-y-4 w-60'>
            <h2 className='font-raleway  text-white '>Features</h2>
            <div>
              <Link to="/" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>User-Friendly Interface</Link>
            </div>
            <div>
              <Link to="/services" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Template Library</Link>
            </div>
            <div>
              <Link to="/contact-us" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Collaboration Tools</Link>
            </div>
            <div>
              <Link to="/about-us" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Diverse Design Elements </Link>
            </div>
          </div>
          <div className='flex-col space-y-4 w-60'>
            <h2 className='font-raleway  text-white '>Quick Links</h2>
            <div>
              <Link to="/" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>About</Link>
            </div>
            <div>
              <Link to="/services" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Pricing</Link>
            </div>
            <div>
              <Link to="/contact-us" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Team</Link>
            </div>
            <div>
              <Link to="/about-us" className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Blogs</Link>
            </div>
          </div>
          <div className='flex-col space-y-4'>
            <h2 className='font-raleway  text-white '>Contact Us</h2>
            <h3 className='text-white text md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>
              <FaLocationDot className='inline text-xl mr-2' />              
              2366 Merton Street,
              Toronto
              Canada</h3>
            <h3 className='text-white md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>
              <MdEmail className='inline text-xl mr-2' />
              connect@vratrix.com
            </h3>
            <h3 className='text-white md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>
              <PiPhoneCallFill className='inline text-xl mr-2' />
              +1-416-839-6023</h3>
          </div>
        </div>
      </div>

    </div>
  )
}
