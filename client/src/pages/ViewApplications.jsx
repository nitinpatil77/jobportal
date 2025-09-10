import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className='container mx-auto'>
      <div className='overflow-x-auto w-[75%]'>
        <table className='w-full shrink-0 bg-white border border-gray-400 max-sm:text-sm'>
          <thead>
            <tr className='border-b border-gray-400'>
              <th className='py-4 px-4 text-left'>#</th>
              <th className='py-4 px-4 text-left'>User Name</th>
              <th className='py-4 px-4 text-left'>Job Title</th>
              <th className='py-4 px-4 text-left'>Location</th>
              <th className='py-4 px-5 text-left'>Resume</th>
              <th className='py-4 px-10 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((application, index) => (
              <tr className='border-b border-gray-400 text-gray-700' key={index}>
                <td className='py-3 px-4 text-left'>{index + 1}</td>
                <td className='py-3 px-4 text-left flex justify-start items-center gap-4'>
                  <img className='w-10 h-10 rounded-full' src={application.imgSrc} />
                  <span>{application.name}</span>
                </td>
                <td className='py-3 px-4 text-left max-sm:hidden'>{application.jobTitle}</td>
                <td className='py-3 px-4 text-left max-sm:hidden'>{application.location}</td>
                <td className='py-3 px-4 text-left'>
                  <a className='flex justify-center items-center gap-3 py-2 px-3 bg-blue-50 text-blue-500' href="" target='_blank'>
                    Resume <img className='mt-1' src={assets.resume_download_icon} />
                  </a>
                </td>
                <td className='py-3 px-4 text-left'>
                  <div className='flex justify-center items-start gap-5'>
                    <button className='text-blue-500'>Accept</button>
                    <button className='text-red-500'>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
