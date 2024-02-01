import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../images/facebook_icon.png';
import instagram from '../images/instagram_icon.png';
import linkedin from '../images/linkedin_icon.png';

export default function footer() {
  return (
    <div className='w-full z-10 p-5 pb-0 md:px-14 px-6 bg-[#000325]'>
      <div className='md:flex justify-between pb-4 md:px-8 md:pr-4 '>
      <div className='md:w-1/3'>
      <p className='text-white py-6 md:py-8 mr-32 font-raleway font-thin md:font-extralight'>Pioneering VR Training for the power sector, we offer progressive modules, personalized support, and cutting-edge features. Elevate skills with immersive learning for enhanced performance and safety excellence.</p>
      </div>
      <div className='md:w-1/2 md:p-4 h-full space-x-8 flex justify-evenly'>
        <div className='flex-col space-y-4 w-60'>
          <h2 className='font-raleway  text-white '>features</h2>
          <div>
            <Link to="/"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>User-Friendly Interface</Link>
          </div>
          <div>
          <Link to="/services"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Template Library</Link>  
          </div>
          <div>
          <Link to="/contact-us"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Collaboration Tools</Link>
          </div>
          <div>
          <Link to="/about-us"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Diverse Design Elements </Link>
          </div>
        </div>
        <div className='flex-col space-y-4 w-60'>
          <h2 className='font-raleway  text-white '>Quick Links</h2>
          <div>
            <Link to="/"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>About</Link>
          </div>
          <div>
          <Link to="/services"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Pricing</Link>  
          </div>
          <div>
          <Link to="/contact-us"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Team</Link>
          </div>
          <div>
          <Link to="/about-us"className=' text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>Blogs</Link>
          </div>
        </div>
        <div className='flex-col space-y-4'>
          <h2 className='font-raleway  text-white '>Contact Us</h2>
          <h3 className='text-white  text md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all'>
                                                                                                                                  2366 Merton Street, 
                                                                                                                                  Toronto 
                                                                                                                                  Canada</h3>
          <h3 className='text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>connect@vratrix.com</h3>
          <h3 className='text-white  md:block font-raleway hover:text-[#ffffffc5] focus:text-[#ffffffc5]  text-sm transition-all '>+1-416-839-6023</h3>
        </div>
      </div>
      </div>

    </div>
  )
}
