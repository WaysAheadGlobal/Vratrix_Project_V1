import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import bg from '../images/login.png';
import api from '../Api.js';
import "../output.css";

function Signup() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: ""
  });

  const sendOtp = async () => {
    try {
      const response = await api.post('/signup/otp', { email: formData.email, name: formData.name, user_type: formData.user_type, phone: formData.phone });
      if (response && response.data && response.data.success) {
        setIsOtpSent(true);
      } else {
        setError('Error sending OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.response && error.response.data && error.response.data.includes('User already exists')) {
        setError('User already exists');
      } else {
        setError('Error sending OTP. Please try again.');
      }
    }
  };


  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/signup', {
        ...formData,
        phone: "+91" + formData.phone,
      });
      if (response.data.success) {
        document.cookie = `user_id=${response.data.user}`;
        window.location.href = '/subscription';
        setIsSignedUp(true);
      } else {
        setError('');
      }
    } catch (err) {
      setError(err.response.data)
      console.error("Error signing in:", err);
    }

  };



  return (
    <div className='w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center' style={{
      backgroundImage: `url(${bg})`,
    }}>
      
      {/* <img src={bg} className='absolute w-screen h-screen'></img> */}

      <div className='bg-white md:w-2/6  space-y-8 rounded-xl p-4 shadow-xl shadow-white z-10'>
        <h1 className='font-semibold text-center text-4xl'>Create Your Account</h1>
        {error &&
          <div className={`fixed bottom-5  z-20 right-5 bg-white py-2 text-sm ${error ? "opacity-100" : "opacity-0"} p-3 flex transition-all duration-700  items-center shadow-xl border-4 rounded-md border-red-500`}>
            <p className="text-red-500 text-center">{error}</p>
          </div>
        }
        {isOtpSent &&
          <div className={`fixed bottom-5 right-5 bg-white py-2 text-sm ${isOtpSent ? "opacity-100" : "opacity-0"} p-3 flex transition-all duration-700  items-center shadow-xl border-4 rounded-md border-green-500`}>
            <p className="text-green-500  text-center">OTP sent succesfully</p>
          </div>
        }
        <form onSubmit={handleFormSubmit} className="">
          <div className='flex space-y-2 flex-col'>

            <label htmlFor="name" className='px-2 font-light'>Full Name</label>
            <input required type="text" name="name" id="name" onChange={handleInputChange} value={formData.name} placeholder="John Mark" className='border-2 px-2 py-1 border-gray-300 rounded-md shadow-md'></input>

            <label htmlFor="email" className='px-2 font-light'>Email</label>
            <input required type="email" name="email" id="email" onChange={handleInputChange} value={formData.email} placeholder="john.mark@gmail.com" className='border-2 px-2 py-1 border-gray-300 rounded-md shadow-md'></input>

            <label htmlFor="phone" className='px-2 font-light'>Mobile Number</label>
            <div className='w-full flex gap-2 border-2 px-2 py-1 border-gray-300 rounded-md shadow-md'>
              <p>+91</p>
              <input required onChange={handleInputChange} value={formData.phone} pattern="^[0-9]*$" title="Please enter a valid phone number of format along with country code." maxLength={10} minLength={10} name="phone" id="phone" placeholder="" className='w-full outline-none'></input>
            </div>
          </div>
          <div className='flex justify-between   my-5'>
            <div className='flex space-x-1'>
              <input id="otp" name='otp' onChange={handleInputChange} value={formData.otp} className={`w-20 h-8 rounded-md bg-[#8B3DFF1a] border border-[#8B3DFF] text-center ${!isOtpSent && ("bg-gray-200 cursor-not-allowed")} transition-all duration-300`} placeholder="* * * *" required maxLength={4}></input>
            </div>
            <div className='px-3 font-light text-sm'>
              {!isOtpSent ?
                (<button onClick={sendOtp} type="button">
                  <a>Send OTP</a>
                </button>
                )
                :
                (<a className='text-gray-400'>OTP already sent</a>)
              }
            </div>
          </div>
          <div className='flex flex-col space-y-3'>
            <button className='bg-black w-full h-10 uppercase flex items-center text-white justify-center' disabled={!isOtpSent}>SIGN UP</button>
            <p className='font-light text-sm text-center'>Already have an account? <Link to="/log-in" className=' font-bold text-[#8B3Dff] px-1 '>Login</Link></p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Signup;