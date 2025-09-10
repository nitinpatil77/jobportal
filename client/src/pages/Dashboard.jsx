import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col'>
      {/* Navbar */}
      <div className='py-4 flex justify-between items-center shadow px-5'>
        <img 
          className='cursor-pointer max-sm:w-40' 
          src={assets.logo} 
          alt="Logo" 
          onClick={() => navigate("/")} 
        />
        <div className='flex justify-center items-center gap-4'>
          <p className='text-lg'>Hi! Aniket</p>
          <div className='relative group'>
            <img className='w-10 rounded-full' src={assets.profile_img} alt="Profile"/>
            <div className='hidden group-hover:block absolute top-0 right-0 z-10 w-40'>
              <ul className='list-none mt-16 bg-white rounded shadow px-3 py-4'>
                <li className='mb-1.5 text-base cursor-pointer'>My Profile</li>
                <li className='mb-1.5 text-base cursor-pointer'>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className='flex items-start flex-1'>
        <div className='inline-block h-full border border-gray-300'>
          <ul className='flex flex-col items-start pt-5 text-gray-800 w-60'>
            <NavLink 
              to="/dashboard/add-job" 
              className={({ isActive }) => 
                `flex items-center px-5 py-3 gap-3.5 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`
              }
            >
              <img className='w-5' src={assets.add_icon} alt="Add Job"/>
              <p className='max-sm:hidden text-lg'>Add Job</p>
            </NavLink>
            <NavLink 
              to="/dashboard/manage-job" 
              className={({ isActive }) => 
                `flex items-center px-5 py-3 gap-3.5 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`
              }
            >
              <img className='w-5' src={assets.home_icon} alt="Manage Job"/>
              <p className='max-sm:hidden text-lg'>Manage Job</p>
            </NavLink>
            <NavLink 
              to="/dashboard/view-application" 
              className={({ isActive }) => 
                `flex items-center px-5 py-3 gap-3.5 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`
              }
            >
              <img className='w-5' src={assets.person_tick_icon} alt="View Applications"/>
              <p className='max-sm:hidden text-lg'>View Application</p>
            </NavLink>
          </ul>
        </div>

        {/* Dynamic page render */}
        <div className='flex-1 p-5'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
