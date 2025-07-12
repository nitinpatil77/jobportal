import React from 'react'
import { assets, jobsData } from '../assets/assets'

const JobCard = ({job}) => {
  return (
      <div className='border border-gray-200 p-6 shadow rounded'>
        <div className='flex justify-between items-center mb-4'>
         <img className='h-8' src={assets.company_icon} alt="company logo"/> 
        </div>
         <h3 className='font-medium text-xl'>{job.title}</h3>
         <div className='flex items-center gap-3 mt-3 text-base'>
            <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
            <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
         </div>
         <p className='text-gray-500 text-base mt-3' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
         <div className='flex items-center gap-4 mt-4 text-sm'>
            <button className='bg-blue-600 px-4 py-2 text-white rounded'>Apply now</button>
            <button className='border border-gray-400 px-4 py-2 rounded'>Learn More</button>
         </div>
      </div>
  )
}

export default JobCard
