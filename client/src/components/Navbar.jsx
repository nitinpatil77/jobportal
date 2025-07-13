import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const Navigate = useNavigate();
  
  return (
    <div className='shadow py-4'>
      <div className='container px-3 mx-auto 2xl:px-20 flex justify-between items-center'>
         <img onClick={()=> Navigate("/")} className='max-sm:w-40' src={assets.logo} alt="logo"/>
         <div className='flex justify-center items-center gap-5 max-sm:text-base'>
            {/* <button className='text-gray-600'>Recruiter Login</button> */}
            <button className='bg-blue-600 rounded-full text-white font-normal px-6 sm:px-9 py-2'>Login</button>
         </div>
      </div>
    </div>
  )
}

export default Navbar
