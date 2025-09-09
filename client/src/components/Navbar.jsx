import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const Navigate = useNavigate();

  const {setShowRecuriterLogin} = useContext(AppContext)
  
  
  return (
    <div className='shadow py-4'>
      <div className='container px-3 mx-auto 2xl:px-20 flex justify-between items-center'>
         <img onClick={()=> Navigate("/")} className='max-sm:w-40 cursor-pointer' src={assets.logo} alt="logo"/>
         <div className='flex justify-center items-center gap-5 max-sm:text-base'>
            <button onClick={()=> setShowRecuriterLogin(true)} className='text-gray-600 cursor-pointer'>Recruiter Login</button> 
            {/* when user login show this 
            <button onClick={()=> Navigate('/applications')} className='text-gray-600 cursor-pointer'>Applied Jobs</button>  */}
            <button className='bg-blue-600 rounded-full text-white font-normal px-6 sm:px-9 py-2 cursor-pointer'>Login</button>
         </div>
      </div>
    </div>
  )
}

export default Navbar
